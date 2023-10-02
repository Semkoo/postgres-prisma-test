"use server";

import { EnumStepStatus, Lead } from "@prisma/client";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import prismaORM from "~/prismaORM";
import {
  BusinessValidationSchema,
  ConfirmationValidationSchema,
  ContactValidationSchema,
  FinancialValidationSchema,
  businessFormSchema,
  confirmationFormSchema,
  contactFormSchema,
  financialFormSchema,
} from "./types";

const COOKIE_LEAD_ID = "leadId";

export async function getLead(): Promise<{
  data: Lead | null;
  message: string;
}> {
  try {
    const leadId = cookies().get(COOKIE_LEAD_ID)?.value;

    if (!leadId) {
      return {
        message: "No lead found",
        data: null,
      };
    }

    const lead = await prismaORM.lead.findUnique({
      where: {
        id: leadId,
      },
    });
    return {
      message: "Successfully got lead",
      data: lead,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Error getting lead",
      data: null,
    };
  }
}

export async function updateLead(
  data: ConfirmationValidationSchema,
  path?: string,
): Promise<{
  data: Lead | null;
  message: string;
}> {
  const leadId = cookies().get(COOKIE_LEAD_ID)?.value;

  if (!leadId) {
    return {
      message: "No lead found",
      data: null,
    };
  }
  // validate data
  const validatedData = confirmationFormSchema.parse(data);

  try {
    const lead = await prismaORM.lead.update({
      where: {
        id: leadId,
      },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        businessName: validatedData.businessName,
        businessCity: validatedData.businessCity,
        businessWebsite: validatedData.businessWebsite,
        businessEmail: validatedData.businessEmail,
        businessIncomePerMonth: validatedData.businessIncomePerMonth,
        businessTaxPercentage: validatedData.businessTaxPercentage,
      },
    });

    // delete the cookie
    cookies().delete(COOKIE_LEAD_ID);

    // if path is provided revalidate the path
    if (path) {
      revalidatePath(path);
    }

    return { message: "Successfully update lead", data: lead };
  } catch (e) {
    console.error(e);
    return { message: "Error updating lead", data: null };
  }
}

export async function setContactLead(
  data: ContactValidationSchema,
  path?: string,
): Promise<{
  data: Lead | null;
  message: string;
}> {
  // validate data
  const validatedData = contactFormSchema.parse(data);

  try {
    const lead = await prismaORM.lead.upsert({
      where: {
        email: validatedData.email,
      },
      update: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        stepStatus: EnumStepStatus.CONTACT_INFO,
      },
      create: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        stepStatus: EnumStepStatus.CONTACT_INFO,
      },
    });

    // store the cookies in the browser

    cookies().set(COOKIE_LEAD_ID, lead.id, {
      // expires in 30 minutes
      expires: new Date(Date.now() + 1000 * 60 * 30),
    });

    // if path is provided revalidate the path
    if (path) {
      revalidatePath(path);
    }

    return { message: "Successfully added contact", data: lead };
  } catch (e) {
    console.error(e);
    return { message: "Error adding contact lead", data: null };
  }
}

export async function setBusinessLead(
  data: BusinessValidationSchema,
  path?: string,
): Promise<{
  data: Lead | null;
  message: string;
}> {
  const leadId = cookies().get(COOKIE_LEAD_ID)?.value;

  if (!leadId) {
    return {
      message: "No lead found",
      data: null,
    };
  }
  // validate data
  const validatedData = businessFormSchema.parse(data);
  try {
    // retrieve lead from cookie id and update it with business info and step status to business info and return it
    const lead = await prismaORM.lead.update({
      where: {
        id: leadId,
      },
      data: {
        businessName: validatedData.businessName,
        businessCity: validatedData.businessCity,
        businessWebsite: validatedData.businessWebsite,
        businessEmail: validatedData.businessEmail,
        stepStatus: EnumStepStatus.BUSINESS_INFO,
      },
    });
    // if no lead found return error
    if (!lead) {
      return { message: "No lead found", data: null };
    }

    // if path is provided revalidate the path
    if (path) {
      revalidatePath(path);
    }

    return { message: "Successfully added business info", data: lead };
  } catch (e) {
    console.error(e);
    return { message: "Error setting business lead", data: null };
  }
}

export async function setFinancialLead(
  data: FinancialValidationSchema,
  path?: string,
): Promise<{
  data: Lead | null;
  message: string;
}> {
  const leadId = cookies().get(COOKIE_LEAD_ID)?.value;

  if (!leadId) {
    return {
      message: "No lead found",
      data: null,
    };
  }
  // validate data
  const validatedData = financialFormSchema.parse(data);
  try {
    // retrieve lead from cookie id and update it with business info and step status to business info and return it
    const lead = await prismaORM.lead.update({
      where: {
        id: leadId,
      },
      data: {
        businessIncomePerMonth: validatedData.businessIncomePerMonth,
        businessTaxPercentage: validatedData.businessTaxPercentage,
        stepStatus: EnumStepStatus.FINANCIAL_INFO,
      },
    });
    // if no lead found return error
    if (!lead) {
      return { message: "No lead found", data: null };
    }

    // if path is provided revalidate the path
    if (path) {
      revalidatePath(path);
    }

    return { message: "Successfully added business", data: lead };
  } catch (e) {
    console.error(e);
    return { message: "Error setting business lead", data: null };
  }
}
