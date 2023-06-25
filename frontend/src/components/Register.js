import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
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
            <h2 className="action__title">Регистрация</h2>
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
                <button className="action__save-button" type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
            </form>
            <p className="action__text">Уже зарегистрированы? <Link className="action__text_link" to="/sign-in">Войти</Link></p>
        </div>
    )
}

export default Register;