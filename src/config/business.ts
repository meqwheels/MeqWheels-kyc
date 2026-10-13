/**
 * Business Identity and Operational Configuration
 * 
 * IMPORTANT FOR OWNER:
 * Before production launch and DigiLocker Requester approval, replace all
 * placeholder fields marked [CONFIGURE_BEFORE_LAUNCH] with your registered
 * legal entity details, official address, and authorized contact info.
 */

export const BUSINESS_CONFIG = {
  // Brand & Public Identity
  brandName: 'MEQ WHEELS',
  tagline: 'Rental Counter KYC & Fleet Terminal',

  // Registered Legal Entity Details
  legalEntityName: 'MEQ WHEELS',
  
  // Registration & Tax Identifiers
  registrationNumber: 'MSME Registered Enterprise',
  gstin: 'Available on Request',

  // Physical Location & Rental Counter
  registeredAddress: {
    street: 'Joyville Hadapsar Annexe',
    locality: 'Solapur Highway, Shewalwadi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '412307',
    country: 'India',
  },

  // Operating Hours
  operatingHours: '24hrs',

  // Customer Support Contact Channels
  contact: {
    supportEmail: 'support@meqwheels.com',
    supportPhone: '+91 8530454495',
    rentalDeskHelpline: '+91 8530454495',
  },

  // Grievance Redressal Officer (Mandated under DPDP Act 2023 & IT Act 2000)
  grievanceOfficer: {
    name: 'Grievance Redressal Officer',
    designation: 'Data Protection & Grievance Cell, MEQ WHEELS',
    email: 'grievance@meqwheels.com',
    phone: '+91 8530454495',
    address: 'Joyville Hadapsar Annexe, Solapur Highway, Shewalwadi, Pune 412307, Maharashtra, India',
  },

  // Data Retention Policy Parameters
  dataRetention: {
    // Retention rationale: CMVR regulations & commercial agreement validity
    activeRentalRetentionDays: 'Duration of the active vehicle rental agreement',
    auditArchiveRetentionDays: '180 days post vehicle return for regulatory audit & dispute resolution',
    deletionProcess: 'Automated cryptographic purge or database deletion upon expiration of the audit window',
  },

  // DigiLocker Requester Configuration Reference
  digiLocker: {
    partnerPortalUrl: 'https://partners.digilocker.gov.in',
    issuerAuthority: 'National e-Governance Division (NeGD) & Ministry of Road Transport and Highways (MoRTH)',
    requestedDocTypes: [
      {
        code: 'DRVLC',
        name: 'Driving Licence (DL)',
        purpose: 'Verification of authorization to ride motor vehicles under Section 3 of the Motor Vehicles Act, 1988.',
      },
      {
        code: 'ADHAR',
        name: 'Aadhaar (e-KYC / XML)',
        purpose: 'Identity verification of the registered rider.',
      },
    ],
  },
};
