
export const renderDashboard = (role: string) => {
  if (role === "user") {
    return "/services";
  } else  {
    return "/admin-dashboard";
  }   
  // If Non of above condition's true, so return dashboard (Admin)
  
}