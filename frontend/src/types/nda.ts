export interface MndaFormData {
  // Purpose & Dates
  purpose: string;
  effectiveDate: string;
  mndaTermType: "fixed" | "until_terminated";
  mndaTermYears: string;
  confidentialityTermType: "fixed" | "in_perpetuity";
  confidentialityTermYears: string;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;

  // Party 1
  party1Company: string;
  party1Name: string;
  party1Title: string;
  party1Address: string;

  // Party 2
  party2Company: string;
  party2Name: string;
  party2Title: string;
  party2Address: string;
}

export const initialFormData: MndaFormData = {
  purpose: "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: new Date().toISOString().split("T")[0],
  mndaTermType: "fixed",
  mndaTermYears: "1 year(s)",
  confidentialityTermType: "fixed",
  confidentialityTermYears: "1 year(s)",
  governingLaw: "Delaware",
  jurisdiction: "courts located in New Castle County, Delaware",
  modifications: "None",

  party1Company: "Acme Corporation",
  party1Name: "Jane Doe",
  party1Title: "Chief Executive Officer",
  party1Address: "123 Innovation Way, San Francisco, CA 94105",

  party2Company: "Beta Technologies Inc.",
  party2Name: "John Smith",
  party2Title: "Chief Technology Officer",
  party2Address: "456 Tech Boulevard, Austin, TX 78701",
};
