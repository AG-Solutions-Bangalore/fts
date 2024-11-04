import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import MUIDataTable from 'mui-datatables';
import BASE_URL from '../../../base/BaseUrl';
import Layout from '../../../layout/Layout';


const ViewerList = () => {
    const [viewerData, setViewerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchViewerData = async () => {
        try {
        
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(`${BASE_URL}/api/superadmin-get-all-viewers`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setViewerData(response.data?.viewerUsers);
        } catch (error) {
          console.error("Error fetching Factory data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchViewerData();
      setLoading(false);
    }, []);
  
  
    
  
    const columns = [
      {
        name: "slNo",
        label: "SL No",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return tableMeta.rowIndex + 1;
          },
        },
      },
  
      {
        name: "name",
        label: "Username",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "first_name",
        label: "Full Name",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "user_position",
        label: "Position",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "phone",
        label: "Phone",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "viewer_chapter_ids",
        label: "Chapter Ids",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "viewer_start_date",
        label: "Start Date",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "viewer_end_date",
        label: "End Date",
        options: {
          filter: true,
          sort: false,
        },
      },
     
      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id) => {
            return (
            
              <div 
            onClick={()=>navigate(`/edit-viewer/${id}`)}
              className="flex items-center space-x-2">
                <CiEdit title="Edit" className="h-5 w-5 cursor-pointer" />
              </div>
              
              
            
            );
          },
        },
      },
    ];
    const options = {
      selectableRows: "none",
      elevation: 0,
      responsive: "standard",
      viewColumns: false,
      download: false,
      print: false,
      customToolbar: () => {
        return (
          <div className=' flex justify-end gap-2'>
          <Link
          to="/add-viewer"
          className="btn btn-primary text-center text-xs md:text-right text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
        >
          + Viewer
        </Link>
         
        </div>
        );
      },
      
    };
  return (
   <Layout>
    <div className="mt-5">
        <MUIDataTable
        title='Viewer List'
          data={viewerData ? viewerData : []}
          columns={columns}
          options={options}
        />
      </div>
   </Layout>
  )
}

export default ViewerList