import { useAuth } from "../../auth/useAuth";
import MainPage from "../../component/MainPage";

  
const AdminDashboard = () => {
    const {user} = useAuth();
    return (
        
        <div>
            <MainPage> 
            <div className="main-content">
                <div className="content">
                    <div className="content-header">
                        <h2>Dashboard {user.role}</h2>
                    </div>
                </div>
            </div>
            </MainPage>
            
        </div>
        
        
    )
    
}
export default AdminDashboard;