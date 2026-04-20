import './Button.css';

export function Button({children, onClick, type = "button", className= "", variant = "primary", icon}){
    return(
        <button onClick={onClick} type={type} className={`btn ${variant} ${className}`}>
            {icon && <i className={icon}></i>}
            {children}
        </button>
    )
}