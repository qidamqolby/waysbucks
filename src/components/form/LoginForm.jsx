import React, { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

function LoginForm() {
    const [show, setShow] = useState(true);

    const [userLogin, setUserLogin] = useState({
        id: 0,
        name: "test",
        email: "",
        password: "",
        role: "user",
    });

    function handleOnChange(event) {
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value,
        });
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        setShow(false);
        let parsed = JSON.stringify(userLogin);
        localStorage.setItem("LOGIN_STATUS", parsed);
    }

    return (
        <Modal show={show}>
            <Form className="p-5" onSubmit={handleOnSubmit}>
                <h2 className="text-left fw-bold color-red mb-4">Login</h2>
                <Form.Group className="my-3">
                    <FloatingLabel label="Email address">
                        <Form.Control
                            type="email"
                            placeholder="yourname@example.com"
                            name="email"
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel label="Password">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleOnChange}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button
                        className="btn btn-danger btn-main btn-form col-12"
                        type="submit"
                    >
                        Login
                    </Button>
                </Form.Group>
                <Form.Group>
                    <p className="text-center my-3">
                        Don't have an account? Click{" "}
                        <span className="fw-bold cursor-pointer">Here</span>
                    </p>
                </Form.Group>
            </Form>
        </Modal>
    );
}

export default LoginForm;
