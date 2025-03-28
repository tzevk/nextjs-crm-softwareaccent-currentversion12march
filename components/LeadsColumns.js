import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('company_name', {
    header: 'Company Name',
  }),
  columnHelper.accessor('type', {
    header: 'Type',
  }),
  columnHelper.accessor('city', {
    header: 'City',
  }),
  columnHelper.accessor('enquiry_date', {
    header: 'Enquiry Date',
  }),
  columnHelper.accessor('enquiry_type', {
    header: 'Enquiry Type',
  }),
  columnHelper.accessor('project_status', {
    header: 'Project Status',
  }),
  columnHelper.accessor('followup1_description', {
    header: 'Follow-up',
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div>
        <button onClick={() => handleEdit(row.original)}>Edit</button>
        <button onClick={() => handleDelete(row.original._id)}>Delete</button>
        <button onClick={() => handleOpen(row.original)}>Open</button>
      </div>
    ),
  }),
];