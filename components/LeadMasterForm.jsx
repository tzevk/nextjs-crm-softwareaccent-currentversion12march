import styles from '../styles/leadMaster.module.css';
const LeadMasterForm = ({ lead, onChange, onSubmit, onCancel }) => {
    const industries = ["Oil and Gas", "Water", "Chemical", "Food/Sugar", "Pharma"];
  
    const handleIndustryChange = (e) => {
      const { value, checked } = e.target;
      const current = lead.industry || [];
      if (checked) {
        onChange({ target: { name: "industry", value: [...current, value] } });
      } else {
        onChange({ target: { name: "industry", value: current.filter((i) => i !== value) } });
      }
    };
  
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Lead Master</h2>
        <form onSubmit={onSubmit} className={styles.formGrid}>
          <div className={styles.field}>
            <label>Company Name</label>
            <input name="company_name" value={lead.company_name} onChange={onChange} required />
          </div>
  
          <div className={styles.field}>
            <label>Contact Person</label>
            <input name="contact_person" value={lead.contact_person || ""} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Type</label>
            <input name="type" value={lead.type} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Enquiry Type</label>
            <select name="enquiry_type" value={lead.enquiry_type} onChange={onChange}>
              <option value="">Select</option>
              <option value="email">Email</option>
              <option value="call">Call</option>
              <option value="walk in">Walk In</option>
            </select>
          </div>
  
          <div className={styles.field}>
            <label>City</label>
            <input name="city" value={lead.city} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Project Status</label>
            <input name="project_status" value={lead.project_status} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>State</label>
            <input name="state" value={lead.state || ""} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Country</label>
            <input name="country" value={lead.country || ""} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Email</label>
            <input name="email" value={lead.email || ""} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Phone</label>
            <input name="phone" value={lead.phone || ""} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Website</label>
            <input name="website" value={lead.website || ""} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Status</label>
            <select name="status" value={lead.status || ""} onChange={onChange}>
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
  
          <div className={styles.field}>
            <label>Enquiry Date</label>
            <input type="date" name="enquiry_date" value={lead.enquiry_date} onChange={onChange} />
          </div>
  
          <div className={styles.field}>
            <label>Follow-up Description</label>
            <textarea name="followup1_description" value={lead.followup1_description} onChange={onChange} />
          </div>
  
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label>Industry</label>
            <div className={styles.checkboxList}>
              {industries.map((industry) => (
                <label key={industry}>
                  <input
                    type="checkbox"
                    name="industry"
                    value={industry}
                    checked={lead.industry?.includes(industry)}
                    onChange={handleIndustryChange}
                  />
                  {industry}
                </label>
              ))}
            </div>
          </div>
  
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label>Comment</label>
            <textarea name="comment" value={lead.comment || ""} onChange={onChange} />
          </div>
  
          <div className={`${styles.buttonContainer} ${styles.fullWidth}`}>
            <button type="submit" className={styles.submitButton}>Save</button>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default LeadMasterForm;