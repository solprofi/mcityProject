import React from 'react';
import AdminNav from '../../components/admin/AdminNav/AdminNav';

const AdminLayout = props => (
  <div className='admin_container'>
    <div className='admin_left_nav'>
      <AdminNav />
    </div>
    <div className='admin_left_right'>
      {props.children}
    </div>
  </div>
)

export default AdminLayout