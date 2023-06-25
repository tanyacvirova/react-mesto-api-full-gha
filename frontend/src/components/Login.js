import { useState } from 'react';

function Login(props) {
    const [formValue, setFormValue] = useState({
        password: '',
        email: ''
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onSubmit(formValue);
    }

    return (
        <div className="action">
            <h2 className="action__title">Вход</h2>
            <form onSubmit={handleSubmit} className="action__form">
                <input
                    className="action__form-item"
                    placeholder="Email"
                    name='email'
                    type='email'
                    value={formValue.email}
                    onChange={handleChange}
                />
                <input
                    className="action__form-item"
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    value={formValue.password}
                    onChange={handleChange}
                />
                <button className="action__save-button" type="submit" onSubmit={handleSubmit}>Войти</button>
            </form>
        </div>
    )
}

export default Login;