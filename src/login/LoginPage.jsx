import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from './hooks/UseValidateLogin';
console.log('Trying to import authService');
import { login, register } from '../services/authService';
console.log('authService imported successfully');
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const navigate = useNavigate();
    
    
    const handleLogin = async () => {
        const { error } = validateLogin({ username, password });

        if (error) {
            const validationErrors = {};
            error.details.forEach((detail) => {
                validationErrors[detail.path[0]] = detail.message;
            });
            setErrors(validationErrors);
        } else {
            try {
                const response = await login(username, password); // שימוש בפונקציית ה-login שייבאנו
                localStorage.setItem('token', response.token);  // שמירת ה-JWT שנשלח מהשרת
                setErrors({});
                navigate('/Home');  // ניתוב לדף הבית לאחר התחברות מוצלחת
            } catch (err) {
                setErrors({ general: err.error || 'Login failed' });
            }
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <TextField 
                label="Username" 
                variant="filled" 
                type='text' 
                onChange={handleUsernameChange} 
                value={username}
                error={!!errors.username}
                helperText={errors.username}
            />
            
            <br/><br/><br/>

            <TextField 
                label="Password" 
                variant="filled" 
                type='password'
                onChange={handlePasswordChange} 
                value={password}
                onFocus={() => setShowPasswordRequirements(true)}
                onBlur={() => setShowPasswordRequirements(false)}
                error={!!errors.password}
                helperText={errors.password} // הוספת '' במקרה שאין שגיאה
            />
             {showPasswordRequirements && (
                <p style={{ fontSize: '12px', color: 'red' }}>
                    Password must be at least 10 characters long and contain at least one uppercase letter.
                </p>
            )}
            
            <br/> <br/>  
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </>
    );
}