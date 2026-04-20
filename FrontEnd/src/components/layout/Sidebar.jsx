import style from './Sidebar.module.css';
import avatar from '../../assets/images/male-memojis.png';
import { NavLink, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    return (
        <div className={style.sidebar}>
            <div className={style.avatar}>
                <img src={avatar} alt="Avatar" />
            </div>
            <div className={style.icon}>
                <NavLink to="/dashboard" className={style.iconItem}>
                    <i className="bi bi-pie-chart-fill"></i>
                    {location.pathname === '/dashboard' && <span className={style.activeIndicator}></span>}
                </NavLink>
                <NavLink to="/procurements" className={style.iconItem}>
                    <i className="bi bi-layout-text-window-reverse"></i>
                    {location.pathname === '/procurements' && <span className={style.activeIndicator}></span>}
                    {location.pathname === '/CreateProcurements' && <span className={style.activeIndicator}></span>}
                </NavLink>
                <NavLink to="/remote-access" className={style.iconItem}>
                    <i className="bi bi-people-fill"></i>
                    {location.pathname === '/remote-access' && <span className={style.activeIndicator}></span>}
                </NavLink>
                <div className={style.iconExit}>
                    <i className="bi bi-box-arrow-right"></i>
                    <div className={style.exitIndicator}></div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;