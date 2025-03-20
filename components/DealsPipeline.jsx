const DealsPipeline = ({ data = {} }) => {
  const pipelineData = [
    { id: "Lead", value: data.leads || 80 },
    { id: "Contacted", value: data.contacted || 60 },
    { id: "Negotiation", value: data.negotiation || 40 },
    { id: "Closed", value: data.closed || 20 },
  ];

  return (
    <div>
      {/* Your Chart or UI rendering logic */}
    </div>
  );
};

export default DealsPipeline;