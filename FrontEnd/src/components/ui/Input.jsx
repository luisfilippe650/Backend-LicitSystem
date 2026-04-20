import "./Input.css";

export function Input({type = "text", placeholder, icon, ...props}) {
    return (
        <div className="input-container">
            {icon && <i className={`input-icon ${icon}`}></i>}
            <input type={type} placeholder={placeholder} {...props} />
        </div>
    );
}