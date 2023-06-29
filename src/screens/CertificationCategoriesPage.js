import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
const CertificationCategoriesPage = ({ navigation }) => {

  const certificationsArrayOfObjs = [
    {
      title: "Communication and Network Security",
      Beginner: [
        {
          name: "Palo Alto Networks Certified Cybersecurity Entry-level Technician (PCCET)",
          link: "https://www.paloaltonetworks.com/services/education/palo-alto-networks-certified-cybersecurity-entry-level-technician",
        },
        {
          name: "CCSA - CHECK POINT Certified Security Administrator R80.20",
          link: "https://www.globalknowledge.com/us-en/training/certification-prep/topics/cybersecurity/section/check-point/ccsa-check-point-certified-security-administrator-r8020/#gref",
        },
        {
          name: "Cisco Certified Technician (CCT)",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry/technician-cct.html",
        },
        {
          name: "Juniper Networks Certified Associate Security (JNCIA-SEC)",
          link: "https://www.juniper.net/us/en/training/certification/tracks/security/jncia-sec.html",
        },
        {
          name: "NSE 3 – FortiNET Network Security Associate",
          link: "https://training.fortinet.com/local/staticpage/view.php?page=nse_3",
        },
        {
          name: "Protocol Analysis Institute Wireshark Certified Network Analyst",
          link: "https://www.wcnacertification.com/exam-information-1",
        },
        {
          name: "Mosse Institute Network Security Essentials",
          link: "https://www.mosse-institute.com/certifications/mnse-network-security-essentials.html",
        },
        {
          name: "Palo Alto Networks Certified Network Security Administrator (PCNSA)",
          link: "https://www.paloaltonetworks.com/services/education/palo-alto-networks-certified-network-security-administrator",
        },
        {
          name: "CompTIA Network+",
          link: "https://www.comptia.org/certifications/network",
        },
        {
          name: "ISECOM OSSTMM Wireless Security Expert",
          link: "https://www.isecom.org/certification.html",
        },
      ],
      Intermediate: [
        {
          name: "NSE 4 – FortiNET Network Security Professional",
          link: "https://training.fortinet.com/local/staticpage/view.php?page=nse_4",
        },
        {
          name: "CWSP - Certified Wireless Security Professional",
          link: "https://www.cwnp.com/certifications/cwsp",
        },
        {
          name: "F5 Big-IP Certified Technical Specialist – Domain Name Services",
          link: "https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740",
        },
        {
          name: "Palo Alto Networks Certified Detection and Remediation Analyst (PCDRA)",
          link: "https://www.paloaltonetworks.com/services/education/palo-alto-networks-certified-detection-and-remediation-analyst",
          name: "F5 Big-IP Certified Technical Specialist – Access Policy Manager",
          link: "https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740",
        },
        {
          name: "NSE 5 – FortiNET Network Security Analyst",
          link: "https://training.fortinet.com/local/staticpage/view.php?page=nse_5",
        },
        {
          name: "Cisco Certified Network Associate",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html", // The link for this certification is missing in the provided information.
        },
        {
          name: "Juniper Networks Certified Internet Specialist (Security)",
          link: "https://www.juniper.net/us/en/training/certification/tracks.html?tab=jncisec",
        },
        {
          name: "CCSE - Checkpoint Certified Security Expert",
          link: "https://training-certifications.checkpoint.com/#/courses/Certified%20Security%20Expert%20R81.1%20(CCSE)",
        },
        {
          name: "NSE 6 – FortiNET Network Security Specialist",
          link: "https://training.fortinet.com/local/staticpage/view.php?page=nse_6",
        },
        {
          name: "CCSM - Checkpoint Certified Security Master",
          link: "https://training-certifications.checkpoint.com/#/",
        },
        {
          name: "Palo Alto Networks Certified Security Automation Engineer (PCSAE)",
          link: "https://www.paloaltonetworks.com/services/education/palo-alto-networks-certified-security-automation-engineer",
        },
        {
          name: "Prisma Certified Cloud Security Engineer (PCCSE)",
          link: "https://www.paloaltonetworks.com/services/education/prisma-certified-cloud-security-engineer",
        },
      ],
      Expert: [
        {
          name: "NSE 7 – FortiNET Network Security Architect",
          link: "https://training.fortinet.com/local/staticpage/view.php?page=nse_7",
        },
        {
          name: "F5 Big-IP Certified Solution Expert – Security",
          link: "https://view.ceros.com/f5/certification-roadmap/p/9?heightOverride=740",
        },
        {
          name: "Cisco Certified Network Professional – Enterprise",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-enterprise.html", // The link for this certification is missing in the provided information.
        },
        {
          name: "Juniper Networks Certified Internet Professional (Security)",
          link: "https://www.juniper.net/us/en/training/certification/tracks.html?tab=jncip-sec",
        },
        {
          name: "Palo Alto Networks Certified Network Security Engineer (PCNSE)",
          link: "https://www.paloaltonetworks.com/services/education/palo-alto-networks-certified-network-security-engineer",
        },
        {
          name: "Cisco Certified Network Professional – Security",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/ccnp-security-v2.html",
        },
        {
          name: "NSE 8 – FortiNET Network Security Expert",
          link: "https://training.fortinet.com/local/staticpage/view.php?page=nse_8",
        },
        {
          name: "Juniper Networks Certified Internet Expert (Security)",
          link: "https://www.juniper.net/us/en/training/certification/tracks.html?tab=jnciesec",
        },
        {
          name: "Cisco Certified Design Expert",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccde.html", // The link for this certification is missing in the provided information.
        },
        {
          name: "Cisco Certified Internetwork Expert – Enterprise Infrastructure",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-enterprise-infrastructure.html",
        },
        {
          name: "Cisco Certified Implementation Expert – Security",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/expert/ccie-security-v2.html",
        },
      ],
    },
    {
      title: "Identity and Access Management",
      Beginner: [
        {
          name: "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
          link: "https://learn.microsoft.com/en-us/certifications/security-compliance-and-identity-fundamentals/",
        },
        {
          name: "IMI Certified Access Management Specialist",
          link: "https://identitymanagementinstitute.org/cams/",
        },
        {
          name: "Microsoft Certified: Identity and Access Administrator Associate",
          link: "https://learn.microsoft.com/en-us/certifications/identity-and-access-administrator/",
        },
        {
          name: "Certified Identity and Security Technologist",
          link: "https://identitymanagementinstitute.org/cist/",
        },
      ],
      Intermediate: [
        {
          name: "Certified Identity Governance Expert",
          link: "https://identitymanagementinstitute.org/cige/",
        },
        {
          name: "IDPro Certified Identity Professional",
          link: "https://idpro.org/cidpro/",
        },
        {
          name: "Certified Identity and Access Manager",
          link: "https://identitymanagementinstitute.org/ciam-certification/",
        },
      ],
      Expert: [
        {
          name: "Certified Identity Management Professional",
          link: "https://identitymanagementinstitute.org/cimp/",
        },
      ],
    },
    {
      title: "Security Architecture and Engineering",
      Beginner: [
        {
          name: "CompTIA Cloud Essentials+",
          link: "https://www.comptia.org/certifications/cloud-essentials",
        },
        {
          name: "AWS Certified Cloud Practitioner",
          link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
        },
        {
          name: "CompTIA A+",
          link: "https://www.comptia.org/certifications/a",
        },
        {
          name: "ICS.201 OT Security Fundamentals",
          link: "https://limessecurity.com/en/academy/ics-201/",
        },
        {
          name: "Microsoft Certified: Azure Fundamentals",
          link: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
        },
        {
          name: "Mosse Institute System Administration Fundamentals",
          link: "https://www.mosse-institute.com/certifications/msaf-system-administration-fundamentals.html",
        },
        {
          name: "Mosse Institute - Cloud Services Fundamentals",
          link: "https://www.mosse-institute.com/certifications/mcsf-cloud-services-fundamentals.html",
        },
        {
          name: "ICS.211 Technical OT Security",
          link: "https://limessecurity.com/en/academy/ics-211/",
        },
        {
          name: "CompTIA Cloud+",
          link: "https://www.comptia.org/certifications/cloud",
        },
        {
          name: "Google Associate Cloud Engineer",
          link: "https://cloud.google.com/learn/certification/cloud-engineer",
        },
        {
          name: "Linux Foundation Certified IT Associate (LFCA)",
          link: "https://training.linuxfoundation.org/certification/certified-it-associate/",
        },
        {
          name: "ISA/IEC 62443 Cybersecurity Fundamentals Specialist",
          link: "https://www.isa.org/certification/certificate-programs/isa-iec-62443-cybersecurity-certificate-program",
        },
        {
          name: "EITCA/IS Information Security Certificate",
          link: "https://eitca.org/eitca-is-information-security-academy/",
        },
        {
          name: "CompTIA Server+",
          link: "https://www.comptia.org/certifications/server",
        },
        {
          name: "Cloud Security Alliance Certificate of Cloud Security Knowledge (CCSK)",
          link: "https://cloudsecurityalliance.org/education/ccsk/",
        },
        {
          name: "PDSO Certified DevSecOps Professional CDP",
          link: "https://www.practical-devsecops.com/certified-devsecops-professional/",
        },
        {
          name: "Google Professional Cloud Security Engineer",
          link: "https://cloud.google.com/learn/certification/cloud-security-engineer",
        },
        {
          name: "Mile2 Certified Cloud Security Officer",
          link: "https://mile2.com/ccso_outline/",
        },
        {
          name: "Cloud Native Computing Foundation Kubernetes and Cloud Native Associate (KCNA)",
          link: "https://www.cncf.io/certification/kcna/",
        },
        {
          name: "Docker Certified Associate",
          link: "https://training.mirantis.com/certification/dca-certification-exam/",
        },
        {
          name: "Mosse Institute - Certified DevSecOps Engineer",
          link: "https://www.mosse-institute.com/certifications/mdso-certified-devsecops-engineer.html",
        },
        {
          name: "CompTIA Linux+",
          link: "https://www.comptia.org/certifications/linux",
        },
        {
          name: "Linux Professional Institute Certified: Linux Administrator",
          link: "https://www.lpi.org/our-certifications/lpic-1-overview",
        },
        {
          name: "SUSE Certified Administrator",
          link: "https://www.suse.com/training/exam/sca-sles-15/",
        },
        {
          name: "Microsoft Certified: Azure IoT Developer Specialty",
          link: "https://learn.microsoft.com/en-us/certifications/azure-iot-developer-specialty/?wt.mc_id=learningredirect_certs-web-wwl",
        },
        {
          name: "GIAC Global Industrial Cyber Security Professional",
          link: "https://www.giac.org/certifications/global-industrial-cyber-security-professional-gicsp/",
        },
      ],
      Intermediate: [
        {
          name: "Microsoft Certified: Azure Administrator Associate",
          link: "https://learn.microsoft.com/en-us/certifications/azure-administrator/?wt.mc_id=learningredirect_certs-web-wwl",
        },
        {
          name: "PECB Lead Cloud Security Manager",
          link: "https://pecb.com/en/education-and-certification-for-individuals/cloud-security/lead-cloud-security-manager",
        },
        {
          name: "EC Council Certified Cloud Security Engineer",
          link: "https://cert.eccouncil.org/certified-cloud-security-engineer.html",
        },
        {
          name: "Mosse Institute - Cloud Security Engineer",
          link: "https://www.mosse-institute.com/certifications/mcse-certified-cloud-security-engineer.html",
        },
        {
          name: "GIAC Cloud Security Essentials",
          link: "https://www.giac.org/certifications/cloud-security-essentials-gcld/",
        },
        {
          name: "AWS Certified Solutions Architect – Associate",
          link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        },
        {
          name: "Splunk Enterprise Security Certified Administrator",
          link: "https://www.splunk.com/en_us/training/certification-track/splunk-es-certified-admin.html",
        },
        {
          name: "Microsoft Certified: Azure Security Engineer Associate",
          link: "https://learn.microsoft.com/en-us/certifications/azure-solutions-architect/?wt.mc_id=learningredirect_certs-web-wwl",
        },
        {
          name: "VMware Certified Professional in Network Virtualization",
          link: "https://www.vmware.com/learning/certification/vcp-nv-nsxt.html",
        },
        {
          name: "Cloud Native Computing Foundation Certified Kubernetes Application Developer (CKAD)",
          link: "https://www.cncf.io/certification/ckad/",
        },
        {
          name: "Linux Professional Institute Certified: Linux Engineer",
          link: "https://www.lpi.org/our-certifications/lpic-2-overview",
        },
        {
          name: "GIAC Critical Infrastructure Protection",
          link: "https://www.giac.org/certifications/critical-infrastructure-protection-gcip/",
        },
        {
          name: "AWS Certified Security - Specialty",
          link: "https://aws.amazon.com/certification/certified-security-specialty/",
        },
        {
          name: "Cloud Native Computing Foundation Certified Kubernetes Administrator (CKA)",
          link: "https://www.cncf.io/certification/cka/",
        },
      ],
      Expert: [
        {
          name: "Microsoft 365 Certified: Enterprise Administrator Expert",
          link: "https://learn.microsoft.com/en-us/certifications/m365-enterprise-administrator/",
        },
        {
          name: "GIAC Public Cloud Security (GPCS)",
          link: "https://www.giac.org/certifications/public-cloud-security-gpcs/",
        },
        {
          name: "GIAC Cloud Security Automation (GCSA)",
          link: "https://www.giac.org/certifications/cloud-security-automation-gcsa/",
        },
        {
          name: "GIAC Certified Windows Security Administrator (GCWN)",
          link: "https://www.giac.org/certifications/certified-windows-security-administrator-gcwn/",
        },
        {
          name: "GIAC Response and Industrial Defense (GRID)",
          link: "https://www.giac.org/certifications/response-industrial-defense-grid/",
        },
        {
          name: "IBITGQ Certified ISO 27001 Information Security Management Specialist Lead Implementer",
          link: "https://www.itgovernance.co.uk/shop/product/certified-iso-270012022-isms-lead-implementer-training-course",
        },
        {
          name: "GIAC Cloud Threat Detection (GCTD)",
          link: "https://www.giac.org/certifications/cloud-threat-detection-gctd/",
        },
        {
          name: "Google Professional Cloud Architect",
          link: "https://cloud.google.com/learn/certification/cloud-architect",
        },
        {
          name: "SUSE Certified Engineer",
          link: "https://www.suse.com/training/exam/sce-sles-15/",
        },
        {
          name: "ISA/IEC 62443 Cybersecurity Expert",
          link: "https://www.isa.org/certification/certificate-programs/isa-iec-62443-cybersecurity-certificate-program",
        },
        {
          name: "GIAC Defensible Security Architect Certification (GDSA)",
          link: "https://www.giac.org/certifications/defensible-security-architecture-gdsa/",
        },
        {
          name: "Microsoft Certified: Azure Solutions Architect Expert",
          link: "https://learn.microsoft.com/en-us/certifications/azure-solutions-architect/",
        },
        {
          name: "VMware Certified Implementation Expert in Network Virtualization",
          link: "https://www.vmware.com/learning/certification/vcap-nv-deploy.html",
        },
        {
          name: "Linux Professional Institute Certified: 303 Security",
          link: "https://www.lpi.org/our-certifications/lpic-3-303-overview",
        },
        {
          name: "SABSA Chartered Security Architect – Practitioner Certificate",
          link: "https://sabsa.org/certification/",
        },
        {
          name: "AWS Certified Solutions Architect – Professional",
          link: "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
        },
        {
          name: "Red Hat Certified Engineer",
          link: "https://www.redhat.com/en/services/certification/rhce",
        },
        {
          name: "GIAC Defending Advanced Threats (GDAT)",
          link: "https://www.giac.org/certifications/defending-advanced-threats-gdat/",
        },
        {
          name: "Microsoft Cybersecurity Architect",
          link: "https://learn.microsoft.com/en-us/certifications/exams/sc-100/",
        },
        {
          name: "VMware Certified Implementation Expert in Data Center Virtualization",
          link: "https://www.vmware.com/learning/certification/vcap-dcv-design.html",
        },
        {
          name: "Linux Foundation Certified Engineer (LFCE)",
          link: "https://training.linuxfoundation.org/LFCECERT-inactive/",
        },
        {
          name: "SANS ICS612: ICS Cybersecurity In-Depth",
          link: "https://www.sans.org/cyber-security-courses/ics-cyber-security-in-depth/",
        },
        {
          name: "VMware Certified Design Expert in Data Center Virtualization",
          link: "https://www.vmware.com/learning/certification/vcdx-dcv.html",
        },
        {
          name: "Red Hat Certified Architect",
          link: "https://www.redhat.com/en/services/certification/rhca",
        },
      ],
    },
    {
      title: "Asset Security",
      Beginner: [
        {
          name: "EXIN Privacy and Data Protection Essentials",
          link: "https://www.exin.com/data-protection-security/exin-privacy-and-data-protection/exin-privacy-and-data-protection-essentials/",
        },
        {
          name: "EXIN Privacy & Data Protection Foundation",
          link: "https://www.exin.com/data-protection-security/exin-privacy-and-data-protection/exin-privacy-and-data-protection-foundation/",
        },
        {
          name: "IAPP Certified Information Privacy Professional",
          link: "https://iapp.org/certify/cipp/",
        },
        {
          name: "IMI Certified Red Flag Specialist (CRFS)",
          link: "https://identitymanagementinstitute.org/crfs/",
        },
      ],
      Intermediate: [
        {
          name: "ASIS Associate Protection Professional (APP)",
          link: "https://www.asisonline.org/certification/associate-protection-professional-app/",
        },
        {
          name: "IMI Certified Identity Management Professional (CIMP)",
          link: "https://identitymanagementinstitute.org/cimp/",
        },
        {
          name: "IMI Certified in Data Protection (CDP)",
          link: "https://identitymanagementinstitute.org/cdp/",
        },
        {
          name: "IMI Certified Identity Protection Advisor (CIPA)",
          link: "https://identitymanagementinstitute.org/cipa/",
        },
        {
          name: "DSCI Certified Privacy Professional",
          link: "https://www.dsci.in/content/dsci-certified-privacy-professional-dcpp",
        },
        {
          name: "EXIN Privacy and Data Protection Practitioner",
          link: "https://embed.exin.totalservices.io/certifications/exin-privacy-and-data-protection-practitioner-exam",
        },
      ],
      Expert: [
        {
          name: "IAPP Certified Information Privacy Technologist",
          link: "https://iapp.org/certify/cipt/",
        },
        {
          name: "ISACA Certified Data Privacy Solutions Engineer (CDPSE)",
          link: "https://www.isaca.org/credentialing/cdpse",
        },
        {
          name: "ASIS Certified Protection Professional (CPP)",
          link: "https://www.asisonline.org/certification/certified-protection-professional-cpp/",
        },
        {
          name: "EXIN Privacy and Data Protection Essentials",
          link: "https://www.exin.com/data-protection-security/exin-privacy-and-data-protection/exin-privacy-and-data-protection-essentials/",
        },
        {
          name: "EXIN Privacy and Data Protection Foundation",
          link: "https://www.exin.com/data-protection-security/exin-privacy-and-data-protection/exin-privacy-and-data-protection-foundation/",
        },
      ],
    },
    {
      title: "Security and Risk Management",
      Beginner: [
        {
          name: "ITIL 4 Foundation",
          link: "https://www.axelos.com/certifications/itil-service-management/itil-4-foundation",
        },
        {
          name: "CompTIA Project+",
          link: "https://www.comptia.org/certifications/project",
        },
        {
          name: "CIISec Information and Cyber Security Fundamentals",
          link: "https://www.ciisec.org/ICSF_Exam",
        },
        {
          name: "EXIN Information Security Foundation",
          link: "https://www.exin.com/data-protection-security/exin-information-security-management-iso- iec-27001/information-security-foundation-based-on-iso-iec-27001/",
        },
        {
          name: "PECP ISO/IEC 27005 Foundation",
          link: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-iec-27005- foundation",
        },
        {
          name: "IBITGQ Certified Cyber Security Foundation",
          link: "https://www.itgovernance.co.uk/shop/product/certified-cyber-security-foundation-training-course",
        },
        {
          name: "IBITGQ Certified ISO 27001 Information Security Management Specialist Foundation",
          link: "https://www.itgovernance.co.uk/shop/product/certified-iso-270012022-isms-foundation-training-course",
        },
        {
          name: "Axelos M_o_R Foundation Risk Management",
          link: "https://www.axelos.com/certifications/propath/mor-risk-management/mor-foundation",
        },
        {
          name: "Fair Institute Analysis Fundamentals",
          link: "https://risklens-academy.myshopify.com/collections/popular-courses/products/fair-analysis-fundamentals-2",
        },
        {
          name: "Scrum.org Professional Scrum Master I",
          link: "https://www.scrum.org/assessments/professional-scrum-master-i-certification",
        },
        {
          name: "APMG ISO/IEC 20000 Foundation",
          link: "https://apmg-international.com/product/iso-20000",
        },
        {
          name: "ISMI Certified Security Manager",
          link: "https://www.ismi.org.uk/csmp/certified-security-manager%C2%AE",
        },
        {
          name: "BCS Foundation Certificate in Information Security Management Principles",
          link: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/information-security-and-ccp-assured-service-certifications/bcs-foundation-certificate-in-information-security-management-principles/",
        },
        {
          name: "ISC2 Certified in Cybersecurity",
          link: "https://www.isc2.org/Certifications/CC?filter=featured&searchRoot=A82B5ABE5FF04271998AE8A4B5D7DEFD#",
        },
        {
          name: "SECO Information Security Foundation",
          link: "https://www.seco-institute.org/certifications/information-security-track/",
        },
        {
          name: "GIAC Information Security Fundamentals (GISF)",
          link: "https://www.giac.org/certifications/information-security-fundamentals-gisf/",
        },
        {
          name: "OpenGroup TOGAF Certified",
          link: "https://www.opengroup.org/certifications/togaf-certification-portfolio",
        },
        {
          name: "GAOM Certified SAFe Practitioner (CSP)",
          link: "https://gaqm.org/certifications/scrum_agile/csp-410",
        },
        {
          name: "IIBA Certification in Cybersecurity Analysis (IIBA-CCA)",
          link: "https://www.iiba.org/business-analysis-certifications/certificate-in-cybersecurity-analysis/",
        },
        {
          name: "IBITGQ Certified in Implementing IT Governance - Foundation & Principles",
          link: "https://www.itgovernance.co.uk/shop/product/implementing-it-governance-foundation-principles-training-course",
        },
        {
          name: "Mile2 Information Systems Certification and Accreditation Professional",
          link: "https://mile2.com/iscap_outline/",
        },
        {
          name: "Infosec Institute Certified Security Awareness Practitioner",
          link: "https://app.infosecinstitute.com/portal/courses/a0t0y000009lTzjAAE",
        },
        {
          name: "PECB ISO/IEC 27032 Foundation",
          link: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27032/iso-iec-27032-foundation",
        },
        {
          name: "Mosse Institute Certified Cybersecurity Leadership",
          link: "https://www.mosse-institute.com/certifications/mcl-cybersecurity-leadership.html",
        },
        {
          name: "CompTIA Security+",
          link: "https://www.comptia.org/certifications/security",
        },
        {
          name: "(ISC)2 Systems Security Certified Practitioner",
          link: "https://www.isc2.org/Certifications/SSCP",
        },
        {
          name: "GIAC Security Essentials (GSEC)",
          link: "https://www.giac.org/certifications/security-essentials-gsec/",
        },
        {
          name: "GAOM Certified Agile Developer (CAD)",
          link: "https://gaqm.org/certifications/scrum_agile/cad",
        },
        {
          name: "GAOM Certified Agile Coach (CAC)",
          link: "https://gaqm.org/certifications/scrum_agile/cac",
        },
        {
          name: "ISMI Certified Security Management Professional (CSMP)",
          link: "https://www.ismi.org.uk/csmp/csmp%C2%AE-overview.aspx",
        },
        {
          name: "EC First Certified Security Compliance Specialist (CSCS)",
          link: "https://ecfirst.biz/index.php?route=product/product&path=59_61&product_id=89",
        },
        {
          name: "APMG ISO/IEC 27001 Foundation",
          link: "https://apmg-international.com/product/isoiec-27001",
        },
        {
          name: "PECB ISO/IEC 27001 Foundation",
          link: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-foundation",
        },
        {
          name: "Mile2 Certified Security Leadership Officer",
          link: "https://mile2.com/cslo_outline/",
        },
      ],
      Intermediate: [
        {
          name: "EC Council Certified Network Defense Architect",
          link: "https://www.eccouncil.org/train-certify/certified-network-security-course/",
        },
        {
          name: "DRI Associate Cyber Resilience Professional (ACRP)",
          link: "https://drii.org/certification/acrp",
        },
        {
          name: "IBITGQ Certified ISO 27005 Information Security Management Specialist Risk Management",
          link: "https://www.itgovernance.co.uk/shop/product/certified-iso-27005-isms-risk-management-training-course",
        },
        {
          name: "DRI Certified Risk Management Professional (CRMP)",
          link: "https://drii.org/certification/crmp",
        },
        {
          name: "SANS Security Awareness Professional (SSAP)",
          link: "https://www.sans.org/security-awareness-training/career-development/credential/",
        },
        {
          name: "OCEG Governance, Risk, and Compliance Professional (GRCP)",
          link: "https://www.oceg.org/certifications/grc-professional-certification/",
        },
        {
          name: "The H Layer Security Awareness and Culture Professional (SACP)",
          link: "https://www.thehlayer.com/about-exam/",
        },
        {
          name: "GAQM Certified Information Security Professional (CISP)",
          link: "https://gaqm.org/certifications/information_systems_security/cisp",
        },
        {
          name: "BCS Practitioner Certificate in Information Assurance Architecture",
          link: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/information-security-and-ccp-assured-service-certifications/bcs-practitioner-certificate-in-information-assurance-architecture/",
        },
        {
          name: "EC First Certified Cyber Security Architect",
          link: "https://ecfirst.biz/index.php?route=product/product&path=59_61&product_id=77",
        },
        {
          name: "GAQM Professional in Project Management (PPM)",
          link: "https://gaqm.org/certifications/project_management/ppm",
        },
        {
          name: "Mile2 Certified Information Systems Security Manager",
          link: "https://mile2.com/cissm_outline/",
        },
        {
          name: "TÜV IT Security Manager",
          link: "https://www.certipedia.com/quality_marks/0000063483?locale=en",
        },
        {
          name: "IBITGQ Certified in Managing Cyber Security Risk",
          link: "https://www.itgovernance.co.uk/shop/product/managing-cyber-security-risk-training-course",
        },
        {
          name: "PECB ISO/IEC 27005 Risk Manager",
          link: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27005/iso-iec-27005-risk-manager",
        },
        {
          name: "EC First Certified CMMC Professional (CCP)",
          link: "https://ecfirst.biz/index.php?route=product/product&path=59_83&product_id=281",
        },
        {
          name: "Mile2 Certified Information Systems Security Officer",
          link: "https://mile2.com/cisso_outline/",
        },
        {
          name: "IBITGQ Certified ISO 27005 ISMS Risk Management",
          link: "https://www.itgovernance.co.uk/shop/product/certified-iso-27005-isms-risk-management-training-course",
        },
        {
          name: "EXIN ISO/IEC 27001 Information Security Management Professional",
          link: "https://www.exin.com/data-protection-security/exin-information-security-management-iso-iec-27001/information-security-management-professional-based-on-iso-iec-27001/",
        },
        {
          name: "PECB ISO/IEC 27032 Lead Cybersecurity Manager",
          link: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27032/iso-iec-27032-lead-cyber-security-manager",
        },
        {
          name: "Mile2 Certified Healthcare Information Systems Security Practitioner",
          link: "https://mile2.com/chissp_outline/",
        },
        {
          name: "Scrum Professional Agile Leadership",
          link: "https://www.scrum.org/assessments/professional-agile-leadership-certification",
        },
        {
          name: "Scrum Professional Scrum Master II",
          link: "https://www.scrum.org/assessments/professional-scrum-master-ii-certification",
        },
        {
          name: "APMG ISO/IEC 20000 Practitioner",
          link: "https://apmg-international.com/product/iso-iec-20000",
        },
        {
          name: "Mile2 Certified Information Systems Risk Manager",
          link: "https://mile2.com/information-systems-risk-mangager-outline/",
        },
        {
          name: "PECB ISO/IEC 27001 Lead Implementer",
          link: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-lead-implementer",
        },
        {
          name: "Axelos M_o_R 4 Practitioner Risk Management",
          link: "https://www.axelos.com/certifications/propath/mor-risk-management/mor-4-practitioner",
        },
        {
          name: "GAQM Certified Project Director (CPD)",
          link: "https://gaqm.org/certifications/project_management/cpd",
        },
        {
          name: "EC Council Information Security Manager",
          link: "https://www.eccouncil.org/train-certify/certified-chief-information-security-officer-cciso/",
        },
        {
          name: "ISACA Certified in the Governance of Enterprise IT (CGEIT)",
          link: "https://www.isaca.org/credentialing/cgeit",
        },
        {
          name: "DRI Certified Cyber Resilience Professional (CCRP)",
          link: "https://drii.org/certification/ccrp",
        },
        {
          name: "Scrum Professional Scrum Developer",
          link: "https://www.scrum.org/assessments/professional-scrum-developer-certification",
        },
        {
          name: "GIAC Certified Project Manager (GCPM)",
          link: "https://www.giac.org/certifications/certified-project-manager-gcpm/",
        },
        {
          name: "BCS Practitioner Certificate in Information Risk Management",
          link: "https://www.bcs.org/qualifications-and-certifications/certifications-for-professionals/information-security-and-ccp-assured-service-certifications/bcs-practitioner-certificate-in-information-risk-management/",
        },

        {
          name: "EXIN Information Security Management Professional",
          link: "https://www.exin.com/data-protection-security/exin-information-security-management-iso-iec-27001/information-security-management-professional-based-on-iso-iec-27001/",
        },
        {
          name: "Mosse Institute Certified GRC Expert",
          link: "https://www.mosse-institute.com/certifications/mgrc-certified-grc-practitioner.html",
        },
      ],

      Expert: [
        {
          name: "GAQM Certified Scrum Master (CSM)",
          link: "https://gaqm.org/certifications/scrum_agile/csm",
        },
        {
          name: "GAQM Certified Agile Scrum Master (CASM)",
          link: "https://gaqm.org/certifications/scrum_agile/casm",
        },
        {
          name: "Mile2 Certified Master Information Systems Security Officer",
          link: "https://mile2.com/master-certifications/",
        },
        {
          name: "Axelos ITIL Managing Professional",
          link: "https://www.axelos.com/certifications/itil-service-management/managing-professional",
        },
        {
          name: "Scrum Scaled Professional Scrum",
          link: "https://www.scrum.org/assessments/scaled-professional-scrum-certification",
        },
        {
          name: "GIAC Law of Data Security & Investigations (GLEG)",
          link: "https://www.giac.org/certifications/law-data-security-investigations-gleg/",
        },
        {
          name: "GAQM Certified Information Systems Security Manager (CISSM)",
          link: "https://gaqm.org/certifications/information_systems_security/cissm",
        },
        {
          name: "(ISC)2 Certified Authorization Professional",
          link: "https://www.isc2.org/Certifications/CGRC",
        },
        {
          name: "(ISC)2 HealthCare Information Security and Privacy Practitioner",
          link: "https://www.isc2.org/Certifications/HCISPP",
        },
        {
          name: "ISACA Certified in Risk and Information Systems Control (CRISC)",
          link: "https://www.isaca.org/credentialing/crisc",
        },
        {
          name: "CompTIA Advanced Security Practitioner+",
          link: "https://www.comptia.org/certifications/comptia-advanced-security-practitioner",
        },
        {
          name: "Axelos ITIL Strategic Leader",
          link: "https://www.axelos.com/certifications/itil-service-management/strategic-leader",
        },
        {
          name: "GIAC Security Leadership (GSLC)",
          link: "https://www.giac.org/certifications/security-leadership-gslc/",
        },
        {
          name: "SECO Certified Information Security Officer",
          link: "https://www.seco-institute.org/certifications/information-security-track/",
        },
        {
          name: "Scrum Professional Scrum Master III",
          link: "https://www.scrum.org/assessments/professional-scrum-master-iii-certification",
        },
        {
          name: "GIAC Information Security Professional (GISP)",
          link: "https://www.giac.org/certifications/information-security-professional-gisp/",
        },
        {
          name: "OpenGroup TOGAF Certified",
          link: "https://www.opengroup.org/certifications/togaf-certification-portfolio",
        },
        {
          name: "EC Council Certified Information Security Officer",
          link: "https://ciso.eccouncil.org/cciso-certification/",
        },
        {
          name: "EXIN Information Security Management Expert",
          link: "https://www.exin.com/data-protection-security/exin-information-security-management-iso- iec-27001/information-security-management-expert-based-on-iso-iec-27001/",
        },
        {
          name: "GIAC Strategic Planning, Policy, and Leadership (GSTRT)",
          link: "https://www.giac.org/certifications/strategic-planning-policy-leadership-gstrt/",
        },
        {
          name: "NCSC Certified Cybersecurity Professional (CCP) Practitioner",
          link: "https://www.ncsc.gov.uk/information/certified-cyber-professional-assured-service",
        },
        {
          name: "(ISC)2 Certified Information Systems Security Professional",
          link: "https://www.isc2.org/Certifications/CISSP",
        },
        {
          name: "PMI Project Management Professional (PMP)",
          link: "https://www.pmi.org/certifications/project-management-pmp",
        },
        {
          name: "ISACA Certified Information Security Manager (CISM)",
          link: "https://www.isaca.org/credentialing/cism",
        },
        {
          name: "SECO Information Security Management Expert",
          link: "https://www.seco-institute.org/certifications/information-security-track/",
        },
        {
          name: "NCSC Certified Cybersecurity Professional (CCP) Senior Practitioner",
          link: "https://www.ncsc.gov.uk/information/certified-cyber-professional-assured-service",
        },
        {
          name: "(ISC)2 Certified Information Systems Security Professional Concentrations",
          link: "https://www.isc2.org/Certifications/CISSP-Concentrations",
        },
        {
          name: "NCSC Certified Cybersecurity Professional (CCP) Lead Practitioner",
          link: "https://www.ncsc.gov.uk/information/certified-cyber-professional-assured-service",
        },
        {
          name: "Axelos ITIL v3 Master",
          link: "https://www.axelos.com/certifications/itil-service-management/itil-master",
        },
        {
          name: "GIAC Security Expert (GSE)",
          link: "https://www.giac.org/get-certified/giac-portfolio-certifications/",
        },
      ],
    },
    {
      title: "Security Assessment and Testing",

      Beginner: [
        {
          name: "EXIN Cyber and IT Security Foundation",
          link: "https://www.exin.com/data-protection-security/exin-cyber-and-it-security/exin-cyber-and-it-security-foundation/",
        },
        {
          name: "DRI Certified Business Continuity Auditor (CBCA)",
          link: "https://drii.org/certification/cbca",
        },
        {
          name: "OCEG Governance, Risk, and Compliance Auditor (GRCA)",
          link: "https://www.oceg.org/certifications/grc-audit-certification/",
        },
        {
          name: "GAQM Certified Information Systems Security Tester (CISST)",
          link: "https://gaqm.org/certifications/information_systems_security/cisst",
        },
      ],

      Intermediate: [
        {
          name: "Shared Assessment Certified Third-Party Risk Management Professional",
          link: "https://sharedassessments.org/ctprp/",
        },
        {
          name: "The Institute of Internal Auditors Certified Internal Auditor (CIA)",
          link: "https://www.theiia.org/en/certifications/cia/?AZRedirect=True",
        },
        {
          name: "DRI Certified Business Continuity Lead Auditor (CBCLA)",
          link: "https://drii.org/certification/cbcla",
        },
        {
          name: "APMG ISO/IEC 20000 Auditor",
          link: "https://apmg-international.com/product/iso-iec-20000",
        },
        {
          name: "Mile2 Certified Information Security Management Systems Lead Auditor",
          link: "https://mile2.com/cisms-la-li-outline/",
        },
        {
          name: "IBITGQ Certified ISO 27001 Information Security Management Specialist Internal Auditor",
          link: "https://www.itgovernance.co.uk/shop/product/certified-iso-270012022-isms-internal-auditor-training-course",
        },
        {
          name: "Mile2 IS20 Controls",
          link: "https://mile2.com/is20_outline/",
        },
        {
          name: "Mile2 Certified Information Systems Security Auditor",
          link: "https://mile2.com/information_systems_security_auditor_outline/",
        },
        {
          name: "APMG ISO/IEC 27001 Auditor",
          link: "https://apmg-international.com/product/isoiec-27001",
        },
        {
          name: "GIAC Certified Intrusion Analyst (GCIA)",
          link: "https://www.giac.org/certifications/certified-intrusion-analyst-gcia/",
        },
        {
          name: "Shared Assessments Certified Third-Party Risk Assessor (CTPRA)",
          link: "https://sharedassessments.org/ctpra/",
        },
        {
          name: "PECB ISO/IEC 27001 Lead Auditor",
          link: "https://pecb.com/en/education-and-certification-for-individuals/iso-iec-27001/iso-iec-27001-lead-auditor",
        },
      ],

      Expert: [
        {
          name: "ISACA Certified Information Systems Auditor (CISA)",
          link: "https://www.isaca.org/credentialing/cisa",
        },
        {
          name: "GIAC Continuous Monitoring (GMON)",
          link: "https://www.giac.org/certifications/continuous-monitoring-certification-gmon/",
        },
        {
          name: "IBITGQ Certified ISO 27001 Information Security Management Specialist Lead Auditor",
          link: "https://www.itgovernance.co.uk/shop/product/certified-iso-270012022-isms-lead-auditor-training-course",
        },
        {
          name: "GIAC Critical Controls Certification (GCCC)",
          link: "https://www.giac.org/certifications/critical-controls-certification-gccc/",
        },
        {
          name: "PCI Qualified Security Assessor (QSA)",
          link: "https://www.pcisecuritystandards.org/assessors_and_solutions/become_qsa/",
        },
        {
          name: "GIAC Systems and Network Auditor (GSNA)",
          link: "https://www.giac.org/certifications/systems-network-auditor-gsna/",
        },
      ],
    },
    {
      title: "Software Security",
      Beginner: [
        {
          name: "SECO Secure Programming Foundation",
          link: "https://www.seco-institute.org/certifications/secure-software-track/foundation/",
        },
        {
          name: "Mosse Institute Certified Application Security Engineer",
          link: "https://www.mosse-institute.com/certifications/mase-certified-application-security-engineer.html",
        },
        {
          name: "GAQM Certified Software Security Tester (CSST)",
          link: "https://gaqm.org/certifications/software_security_testing/csst",
        },
        {
          name: "Mile2 Secure Web Application Engineer",
          link: "https://mile2.com/cswae_outline/",
        },
      ],
      Intermediate: [
        {
          name: "CertNexus Cyber Secure Coder (CSC)",
          link: "https://certnexus.com/cyber-secure-coder/",
        },
        {
          name: "Cisco Certified DevNet Associate",
          link: "https://developer.cisco.com/certification/devnet-associate/",
        },
        {
          name: "GAQM Certified Advanced Software Security Tester (CASST)",
          link: "https://gaqm.org/certifications/software_security_testing/casst",
        },
        {
          name: "EC Council Certified Application Security Engineer",
          link: "https://www.eccouncil.org/train-certify/certified-application-security-engineer-case-java/",
        },
        {
          name: "Cisco Certified DevNet Professional",
          link: "https://developer.cisco.com/certification/devnet-professional/",
        },
        {
          name: "(ISC)2 Certified Secure Software Lifecycle Professional",
          link: "https://www.isc2.org/Certifications/CSSLP",
        },
      ],
      Expert: [
        {
          name: "SECO Certified Secure Programming Leader",
          link: "https://www.seco-institute.org/certifications/certified-secure-software-developer/",
        },
        {
          name: "GIAC Certified Web Application Defender (GWEB)",
          link: "https://www.giac.org/certifications/certified-web-application-defender-gweb/",
        },
      ],
    },

    {
      title: "Security Operations",
      Beginner: [
        {
          name: "EC Council Certified Secure Computer User",
          link: "https://www.eccouncil.org/train-certify/certified-secure-computer-user-cscu/",
        },
        {
          name: "Mosse Institute Certified Introduction to Cyber Security",
          link: "https://www.mosse-institute.com/certifications/mics-introduction-to-cyber-security.html",
        },
        {
          name: "Mile2 Certified Security Principles",
          link: "https://mile2.com/csp_outline/",
        },
        {
          name: "EC Council Certified Network Defender (CND)",
          link: "https://www.eccouncil.org/press-releases/certified-network-defender-cnd-boot-camp-toronto-canada/",
        },
        {
          name: "ISECOM OSSTMM Professional Security Expert",
          link: "https://www.isecom.org/certification.html",
        },
        {
          name: "IBITGQ Cyber Incident Response Management Foundation",
          link: "https://www.itgovernance.co.uk/shop/product/cyber-incident-response-management-foundation-training-course",
        },
        {
          name: "Dark Vortex Malware Incident and Log Forensics",
          link: "https://0xdarkvortex.dev/training-programs/malware-incident-and-log-forensics/",
        },
        {
          name: "EC Council Certified Security Specialist",
          link: "https://www.eccouncil.org/train-certify/certified-security-specialist-ecss/",
        },
        {
          name: "Mile2 Certified Digital Forensics Examiner",
          link: "https://mile2.com/cdfe_outline/",
        },
        {
          name: "SECO Associate SOC Analyst",
          link: "https://www.seco-institute.org/certifications/cyber-defense-track/associate-soc-analyst/",
        },
        {
          name: "Dark Vortex Adversary Operations and Proactive Hunting",
          link: "https://0xdarkvortex.dev/training-programs/adversary-operations-and-proactive-hunting/",
        },
        {
          name: "Mile2 Certified Vulnerability Assessor",
          link: "https://mile2.com/vulnerability-assessor-outline/",
        },
        {
          name: "Kali Linux Certified Professional (KLCP)",
          link: "https://kali.training/",
        },
        {
          name: "EXIN Ethical Hacking Foundation",
          link: "https://www.exin.com/data-protection-security/exin-ethical-hacking/exin-ethical-hacking-foundation/",
        },
        {
          name: "SECO Ethical Hacking Foundation",
          link: "https://www.seco-institute.org/certifications/ethical-hacking-track/foundation/",
        },
        {
          name: "ISECOM Certified Hacker Analyst",
          link: "https://www.isecom.org/certification.html",
        },
        {
          name: "ISACA Cybersecurity Packet Analysis Certificate",
          link: "https://www.isaca.org/credentialing",
        },
        {
          name: "Mosse Institute Cloud Penetration Tester",
          link: "https://www.mosse-institute.com/certifications/mcpt-cloud-penetration-tester.html",
        },
        {
          name: "Mile2 Certified Professional Ethical Hacker",
          link: "https://mile2.com/professional-ethical-hacker/",
        },
        {
          name: "GAQM Certified Professional Ethical Hacker (CPEH)",
          link: "https://gaqm.org/certifications/information_systems_security/cpeh",
        },
        {
          name: "Mosse Institute Certified OSINT Expert",
          link: "https://www.mosse-institute.com/certifications/mois-certified-osint-expert.html",
        },
        {
          name: "GAQM Certified Forensic Analyst (CFA)",
          link: "https://gaqm.org/certifications/information_systems_security/cfa",
        },
        {
          name: "EC Council Certified SOC Analyst",
          link: "https://www.eccouncil.org/train-certify/certified-soc-analyst-csa/",
        },
        {
          name: "GIAC Foundational Cybersecurity Technologies (GFACT)",
          link: "https://www.giac.org/certifications/foundational-cybersecurity-technologies-gfact/",
        },
        {
          name: "Dark Vortex Malware on Steroids",
          link: "https://0xdarkvortex.dev/training-programs/malware-on-steroids/#certification",
        },
        {
          name: "CompTIA PenTest+",
          link: "https://www.comptia.org/certifications/pentest",
        },
        {
          name: "EC Council Certified Encryption Specialist",
          link: "https://www.eccouncil.org/train-certify/ec-council-certified-encryption-specialist-eces/",
        },
        {
          name: "ISECOM OSSTMM Professional Security Analyst",
          link: "https://www.isecom.org/certification.html",
        },
        {
          name: "ASIS Professional Certified Investigator (PCI)",
          link: "https://www.asisonline.org/certification/professional-certified-investigator-pci",
        },
        {
          name: "Certified MITRE ATT&CK Defender Security Operations Center Assessment",
          link: "https://mitre-engenuity.org/cybersecurity/mad/",
        },
        {
          name: "Certified MITRE ATT&CK Defender Cyber Threat Intelligence",
          link: "https://mitre-engenuity.org/cybersecurity/mad/",
        },
        {
          name: "EC Council Certified Ethical Hacker",
          link: "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/",
        },
        {
          name: "Mile2 Certified Penetration Testing Engineer",
          link: "https://mile2.com/penetration-testing-engineer-outline/",
        },
        {
          name: "Dark Vortex Red Team and Operational Security",
          link: "https://0xdarkvortex.dev/training-programs/red-team-and-operational-security/",
        },
        {
          name: "Dark Vortex Offensive Tool Development",
          link: "https://0xdarkvortex.dev/training-programs/offensive-tool-development/",
        },
        {
          name: "Mosse Institute Certified Vulnerability Researcher and Exploitation Specialist",
          link: "https://www.mosse-institute.com/certifications/mvre-vulnerability-researcher-and-exploitation-specialist.html",
        },
      ],
      Intermediate: [
        {
          name: "Microsoft Certified: Security Operations Analyst Associate",
          link: "https://learn.microsoft.com/en-us/certifications/security-operations-analyst/",
        },
        {
          name: "Mosse Institute Remote Cybersecurity Internship Program",
          link: "https://www.mosse-institute.com/certifications/mrci-remote-cybersecurity-internship.html",
        },
        {
          name: "CertNexus CyberSec First Responder",
          link: "https://certnexus.com/cybersec-first-responder-certifications-by-certnexus-enhance-corporate-cybersecurity-practices/",
        },
        {
          name: "EC Council Certified Threat Intelligence Analyst (CTIA)",
          link: "https://www.eccouncil.org/train-certify/certified-threat-intelligence-analyst-ctia/",
        },
        {
          name: "eLearnSecurity Junior Penetration Tester (eJPT)",
          link: "https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester-cert",
        },
        {
          name: "ISECOM Certified Hacker Analyst Trainer",
          link: "https://www.isecom.org/certification.html",
        },
        {
          name: "CompTIA CySA+",
          link: "https://www.comptia.org/certifications/cybersecurity-analyst",
        },
        {
          name: "ISACA Cybersecurity Practitioner",
          link: "https://www.isaca.org/training-and-events/cybersecurity",
        },
        {
          name: "Mile2 Certified Network Forensics Examiner",
          link: "https://mile2.com/network-forensics-examiner-outline/",
        },
        {
          name: "GIAC Open Source Intelligence (GOSI)",
          link: "https://www.giac.org/certifications/open-source-intelligence-gosi/",
        },
        {
          name: "Mile2 Certified Threat Intelligence Analyst",
          link: "https://mile2.com/threat-analyst/",
        },
        {
          name: "Foundational Security Operations and Defensive Analysis",
          link: "https://www.offsec.com/courses/soc-200/",
        },
        {
          name: "eLearnSecurity Mobile Application Penetration Tester",
          link: "https://elearnsecurity.com/product/emapt-certification/",
        },
        {
          name: "Portswigger Burp Suite Certified Practitioner",
          link: "https://portswigger.net/web-security/certification",
        },
        {
          name: "ISECOM OSSTMM Professional Security Tester",
          link: "https://pauljerimy.com/security-certification-roadmap/",
        },
        {
          name: "Offensive Security Web Assessor",
          link: "https://www.offsec.com/courses/web-200/",
        },
        {
          name: "Infosec Institute Certified Reverse Engineering Analyst",
          link: "https://app.infosecinstitute.com/portal/courses/a0tC0000000Fp4IIAS",
        },
        {
          name: "IntelTechniques Open Source Intelligence Professional",
          link: "https://inteltechniques.com/training-osip.html",
        },
        {
          name: "Cisco Certified CyberOps Associate Cyber Operations",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/cyberops-associate.html",
        },
        {
          name: "Mile2 Certified Cybersecurity Analyst",
          link: "https://mile2.com/ccsa_outline/",
        },
        {
          name: "EC Council Certified Hacking Forensic Investigator (CHFI)",
          link: "https://www.eccouncil.org/train-certify/computer-hacking-forensic-investigator-chfi/",
        },
        {
          name: "SECO Certified Threat Analyst",
          link: "https://www.seco-institute.org/certifications/cyber-defense-track/threat-analyst/",
        },
        {
          name: "EC Council Certified Incident Handler (ECIH)",
          link: "https://www.eccouncil.org/train-certify/ec-council-certified-incident-handler-ecih/",
        },
        {
          name: "Mile2 Certified Powershell Hacker",
          link: "https://mile2.com/cpSH_outline/",
        },
        {
          name: "Infosec Institute Certified Mobile and Web Application Penetration Tester",
          link: "https://app.infosecinstitute.com/portal/courses/a0tC0000000Fow6IAC",
        },
        {
          name: "Mile2 Certified Penetration Testing Consultant",
          link: "https://mile2.com/cptc_outline/",
        },
        {
          name: "Infosec Institute Certified Red Team Operations Professional",
          link: "https://app.infosecinstitute.com/portal/courses/a0t0y00000BK8IcAAL",
        },
        {
          name: "OpenText EnCase Certified Examiner",
          link: "https://www.opentext.com/learning-services/learning-paths-encase-certifications",
        },
        {
          name: "AccessData Certified Examiner",
          link: "https://pauljerimy.com/security-certification-roadmap/",
        },
        {
          name: "eLearnSecurity Certified Incident Responder (eCIR)",
          link: "https://elearnsecurity.com/product/ecir-certification/",
        },
        {
          name: "Mile2 Certified Incident Handling Engineer",
          link: "https://mile2.com/cihe_outline/",
        },
        {
          name: "eLearnSecurity Certified Professional Penetration Tester",
          link: "https://elearnsecurity.com/product/ecpptv2-certification/",
        },
        {
          name: "eLearnSecurity Web Application Penetration Tester",
          link: "https://elearnsecurity.com/product/ewpt-certification/",
        },
        {
          name: "Hack the Box Certified Bug Bounty Hunter (HTB CBBH)",
          link: "https://academy.hackthebox.com/preview/certifications/htb-certified-bug-bounty-hunter/",
        },
        {
          name: "Mile2 Certified Disaster Recovery Engineer",
          link: "https://mile2.com/cdre_outline/",
        },
        {
          name: "GIAC Security Operations Certified (GSOC)",
          link: "https://www.giac.org/certifications/security-operations-certified-gsoc/",
        },
        {
          name: "GIAC Battlefield Forensics and Acquisition (GBFA)",
          link: "https://www.giac.org/certifications/battlefield-forensics-acquisition-gbfa/",
        },
        {
          name: "Security Blue Team Level 1",
          link: "https://www.securityblue.team/why-btl1/",
        },
        {
          name: "Mosse Institute Certified Blue Teamer",
          link: "https://www.mosse-institute.com/certifications/mbt-certified-blue-teamer.html",
        },
        {
          name: "Mosse Institute Certified Penetration Tester",
          link: "https://www.mosse-institute.com/certifications/mpt-certified-penetration-tester.html",
        },
        {
          name: "EC Council Certified Penetration Testing Professional (CPENT)",
          link: "https://www.eccouncil.org/train-certify/certified-penetration-testing-professional-cpent/",
        },
        {
          name: "GIAC Enterprise Vulnerability Assessor (GEVA)",
          link: "https://www.giac.org/certifications/enterprise-vulnerability-assessor-geva/",
        },
        {
          name: "Hack the Box Certified Penetration Testing Specialist (HTB CPTS)",
          link: "https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist/",
        },
        {
          name: "Mosse Institute Certified Reverse Engineer",
          link: "https://www.mosse-institute.com/certifications/mre-certified-reverse-engineer.html",
        },
        {
          name: "Microsoft Certified Information Protection Administrator Associate",
          link: "https://learn.microsoft.com/en-us/certifications/information-protection-administrator/",
        },
        {
          name: "ISFCE Certified Computer Examiner",
          link: "https://www.isfce.com/certification.htm",
        },
        {
          name: "Pentester Academy Certified Red Team Professional",
          link: "https://www.pentesteracademy.com/activedirectorylab",
        },
        {
          name: "GIAC Web Application Penetration Tester (GWAPT)",
          link: "https://www.giac.org/certifications/web-application-penetration-tester-gwapt/",
        },
        {
          name: "Offensive Security macOS Researcher",
          link: "https://www.offsec.com/courses/exp-312/",
        },
        {
          name: "GAQM Certified Penetration Tester (CPT)",
          link: "https://gaqm.org/certifications/information_systems_security/certified_penetration_tester_cpt",
        },
        {
          name: "Mosse Institute Certified Threat Hunter",
          link: "https://www.mosse-institute.com/certifications/mth-certified-threat-hunter.html",
        },
        {
          name: "Infosec Institute Certified Data Recovery Professional",
          link: "https://app.infosecinstitute.com/portal/courses/a0tC0000000FovhIAC",
        },
        {
          name: "eLearnSecurity Certified Digital Forensics Professional",
          link: "https://elearnsecurity.com/product/ecdfp-certification/",
        },
        {
          name: "Mosse Institute Certified DFIR Specialist",
          link: "https://www.mosse-institute.com/certifications/mdfir-certified-dfir-specialist.html",
        },
        {
          name: "EC Council Licensed Penetration Tester",
          link: "https://www.eccouncil.org/train-certify/licensed-penetration-tester-lpt-master/",
        },
        {
          name: "TCM Security Practical Network Penetration Tester",
          link: "https://certifications.tcm-sec.com/pnpt/",
        },
        {
          name: "GIAC Cloud Penetration Tester (GCPN)",
          link: "https://www.giac.org/certifications/cloud-penetration-tester-gcpn/",
        },
        {
          name: "GIAC Python Coder (GPYC)",
          link: "https://www.giac.org/certifications/python-coder-gpyc/",
        },
        {
          name: "GIAC Mobile Device Security Analyst (GMOB)",
          link: "https://www.giac.org/certifications/mobile-device-security-analyst-gmob/",
        },
      ],
      Expert: [
        {
          name: "GIAC Certified Detection Analyst (GCDA)",
          link: "https://www.giac.org/certifications/certified-detection-analyst-gcda/",
        },
        {
          name: "Infosec Institute Certified Mobile Forensics Examiner",
          link: "https://app.infosecinstitute.com/portal/courses/a0t1A000009H6juQAC",
        },
        {
          name: "GIAC Certified Incident Handler (GCIH)",
          link: "https://www.giac.org/certifications/certified-incident-handler-gcih/",
        },
        {
          name: "GIAC Penetration Tester (GPEN)",
          link: "https://www.giac.org/certifications/penetration-tester-gpen/",
        },
        {
          name: "Offensive Security Wireless Attacks Professional",
          link: "https://www.offsec.com/courses/pen-210/",
        },
        {
          name: "Zero Point Security Certified Red Team Operator",
          link: "https://training.zeropointsecurity.co.uk/courses/red-team-ops",
        },
        {
          name: "Cisco Certified CyberOps Professional",
          link: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/professional/cyberops-professional.html",
        },
        {
          name: "Infosec Institute Certified Computer Forensics Examiner",
          link: "https://app.infosecinstitute.com/portal/courses/a0t1A000009H5RcQAK",
        },
        {
          name: "GIAC Certified Enterprise Defender (GCED)",
          link: "https://www.giac.org/certifications/certified-enterprise-defender-gced/",
        },
        {
          name: "Mosse Institute Certified Cyber Protection Expert",
          link: "https://www.mosse-institute.com/certifications/mcpe-certified-cyber-protection-expert.html",
        },
        {
          name: "Pentester Academy Certified Red Teaming Expert",
          link: "https://www.pentesteracademy.com/redteamlab",
        },
        {
          name: "Offensive Security Certified Professional",
          link: "https://www.offsec.com/courses/pen-200/",
        },
        {
          name: "GIAC Advanced Smartphone Forensics (GASF)",
          link: "https://www.giac.org/certifications/advanced-smartphone-forensics-gasf/",
        },
        {
          name: "eLearnSecurity Certified Threat Hunting Professional",
          link: "https://elearnsecurity.com/product/ecthpv2-certification/",
        },
        {
          name: "SECO Ethical Hacking Expert",
          link: "https://www.seco-institute.org/certifications/ethical-hacking-track/",
        },
        {
          name: "GIAC Certified Forensic Examiner (GCFE)",
          link: "https://www.giac.org/certifications/certified-forensic-examiner-gcfe/",
        },
        {
          name: "Pentester Academy Certified Enterprise Security Specialist",
          link: "https://www.pentesteracademy.com/gcb",
        },
        {
          name: "SECO Certified Ethical Hacking Leader (S-EHL)",
          link: "https://www.seco-institute.org/certifications/ethical-hacking-track/leader/",
        },
        {
          name: "Zero Point Security Certified Red Team Operator II",
          link: "https://training.zeropointsecurity.co.uk/courses/red-team-ops-ii",
        },
        {
          name: "Mosse Institute Certified Code Deobfuscation Specialist",
          link: "https://www.mosse-institute.com/certifications/mcd-certified-code-deobfuscation-specialist.html",
        },
        {
          name: "Mosse Institute Certified Threat Intelligence Analyst",
          link: "https://www.mosse-institute.com/certifications/mtia-certified-threat-intelligence-analyst.html",
        },
        {
          name: "GIAC Cloud Forensics Responder (GCFR)",
          link: "https://www.giac.org/certifications/cloud-forensics-responder-gcfr/",
        },
        {
          name: "Security Blue Team Level 2",
          link: "https://securityblue.team/btl2/",
        },
        {
          name: "Mosse Institute Certified Red Teamer",
          link: "https://www.mosse-institute.com/certifications/mrt-certified-red-teamer.html",
        },
        {
          name: "OpenText Certified Forensics Security Responder",
          link: "https://www.opentext.com/learning-services/learning-paths-encase-certifications",
        },
        {
          name: "GIAC Network Forensic Analyst (GNFA)",
          link: "https://www.giac.org/certifications/network-forensic-analyst-gnfa/",
        },
        {
          name: "eLearnSecurity Web application Penetration Tester eXtreme",
          link: "https://elearnsecurity.com/product/ewptxv2-certification/",
        },
        {
          name: "IACIS Certified Advanced Windows Forensic Examiner",
          link: "https://www.iacis.com/certification/cawfe/",
        },
        {
          name: "GIAC Certified Forensic Analyst (GCFA)",
          link: "https://www.giac.org/certifications/certified-forensic-analyst-gcfa/",
        },
        {
          name: "GIAC Cyber Threat Intelligence (GCTI)",
          link: "https://www.giac.org/certifications/cyber-threat-intelligence-gcti/",
        },
        {
          name: "GIAC iOS and macOS Examiner (GIME)",
          link: "https://www.giac.org/certifications/ios-macos-examiner-gime/",
        },
        {
          name: "GIAC Assessing and Auditing Wireless Networks (GAWN)",
          link: "https://www.giac.org/certifications/assessing-auditing-wireless-networks-gawn/",
        },
        {
          name: "IACIS Certified Forensic Computer Examiner (CFCE)",
          link: "https://www.iacis.com/certification/",
        },
        {
          name: "GIAC Exploit Researcher and Advanced Penetration Tester (GXPN)",
          link: "https://www.giac.org/certifications/exploit-researcher-advanced-penetration-tester-gxpn/",
        },
        {
          name: "GIAC Reverse Engineering Malware (GREM)",
          link: "https://www.giac.org/certifications/reverse-engineering-malware-grem/",
        },
        {
          name: "Offensive Security Web Expert",
          link: "https://www.offsec.com/courses/web-300/",
        },
        {
          name: "Offensive Security Experienced Penetration Tester",
          link: "https://www.offsec.com/courses/pen-300/",
        },
        {
          name: "Offensive Security Exploit Developer",
          link: "https://www.offsec.com/courses/exp-301/",
        },
        {
          name: "Offensive Security Certified Expert 3",
          link: "https://help.offsec.com/hc/en-us/articles/4403282452628-What-is-OSCE3-",
        },
        {
          name: "Offensive Security Exploitation Expert",
          link: "https://www.offsec.com/courses/exp-401/",
        },
      ],
    },
  ];
  const [certifications, setCertificates] = useState([]);

  const upload = () => {
    certificationsArrayOfObjs.forEach(async function (element) {
      await setDoc(doc(db, "Roadmaps", element.title), element);
    });
  };

  const colRef = collection(db, "Roadmaps");
  useEffect(() => {
    const unsubscribe = onSnapshot(query(colRef), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      setCertificates(list);
    });
    return () => unsubscribe();
  }, []);

  const renderCertificationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate("Certification Details", {
          certification: item,
        });
      }}
    >
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bg.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.blurBackground}>
        <FlatList
          data={certifications}
          renderItem={renderCertificationItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  blurBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  flatListContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    maxWidth: "96%",
    minWidth: "95%",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CertificationCategoriesPage;
