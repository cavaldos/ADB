const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <main>
        <h1>Admin</h1>
        {children}
      </main>
    </div>
  );
};
export default AdminLayout;
