import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Input.css";

function Input({
                          type = "text",
                          placeholder,
                          icon: Icon,
                          isPassword = false,
                          className = "",
                          ...props
                      }) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword
        ? (showPassword ? "text" : "password")
        : type;

    return (
        <div className={`input-container ${className}`}>
            {Icon && (
                typeof Icon === "string"
                    ? <i className={`input-icon ${Icon}`}></i>
                    : <Icon className="input-icon" size={25} />
            )}

            <input
                type={inputType}
                placeholder={placeholder}
                {...props}
            />

            {isPassword && (
                <button
                    type="button"
                    className="icon-right"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                </button>
            )}
        </div>
    );
}

export default Input;