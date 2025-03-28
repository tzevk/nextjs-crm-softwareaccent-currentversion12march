"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LeadForm from "@/components/LeadForm";
import axios from "axios";

const LeadFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams.get("id");

  const [leadData, setLeadData] = useState({
    company_name: '',
    type: '',
    city: '',
    enquiry_date: '',
    enquiry_type: '',
    project_status: '',
    followup1_description: '',
  });

  useEffect(() => {
    const fetchLead = async () => {
      if (leadId) {
        const response = await axios.get(`/api/leads/${leadId}`);
        setLeadData(response.data);
      }
    };
    fetchLead();
  }, [leadId]);

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (leadId) {
      await axios.put(`/api/leads/${leadId}`, leadData);
    } else {
      await axios.post('/api/leads', leadData);
    }

    router.push("/leads");
  };

  return (
    <LeadForm
      lead={leadData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/leads")}
    />
  );
};

export default LeadFormPage;