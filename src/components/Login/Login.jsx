import { Form, Input, Button, Row, Typography} from "antd";
import styles from './Login.module.css';
import logo from '../../assets/img/logo.svg' ;
import {useState, useEffect} from 'react';
import { url } from "../../consts";
import { getApiResource } from "../../api.js";
import { useNavigate } from "react-router-dom";


const { Title } = Typography;
export let isLogin =  localStorage.getItem("key") === null ? false : true
const Login = () => {
 
  const [currenLogin, setLogin] = useState('');
  const [currentPass, setPass] = useState('');
  const [userLogin, setUserLogin] = useState('');

  let navigate = useNavigate();

  const getResource = async (url) =>{
    const res = await getApiResource(url)
    const loginList = res.map(({id,login,password,token}) =>{
      return {
        login, 
        password,
        id, 
        token
      }
    })
    setUserLogin(loginList)
  }

  useEffect(() => {
    getResource(url);
  }, []);

  const handleClick =  () =>{
    userLogin.forEach(({login,password,token}) => {
      if(login === currenLogin && password===currentPass){
            isLogin = true;
            navigate("/") 
            setToken(token);
          }
          
        })
  }
  
  const setToken = (token) => {
    localStorage.setItem('key', token);
  }

  return (
    <>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <div className={styles.form__blok}>
          <img src={logo} alt="logo"/>
          <Title level={3}>Вход</Title>
          <Form
            name="basic" 
            autoComplete="off"
            layout="vertical"
            className={styles.form}

          >
            <Form.Item
              label="Логин"
              name="login"
              getValueFromEvent={(e) => setLogin(e.target.value)}
            >
              <Input  />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              getValueFromEvent={(e) => setPass(e.target.value)}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
            >
              <Button onClick={handleClick}  type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Row>
    </>
  );
};
export default Login;
