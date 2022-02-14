import styles from './Home.module.css';
import { Menu, Row,  Input, Button, Typography, Spin } from 'antd';
import logo from '../../assets/img/logo.svg' ;
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';


const { Title } = Typography;
const Home = () => {


    const [inpValue, setInpValue] = useState('');
    const [loader, setLoader] = useState(false);

    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("key")
        navigate("/login") 
    }

    const handleChange = (e) => {
        setInpValue(e.target.value);
    }
    const [videoList, setVideoList] = useState([]);
    
    const getVideosId = async () => {
        axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params":{
                'part':'snippet',
                'maxResults':'12',
                'key':'AIzaSyCYqNYrevnMN5tRcBloMBqOE5GvLXVjt1g',
                'q': inpValue
            }
        })
            .then((res) => {
                const videoResult = res.data.items.map((item) =>{
                    return item.id.videoId
                })
                setVideoList(videoResult)               
            })
            .catch((error) => {
                console.log(error)
            })
            
            setLoader(true)
            
            setTimeout(function(){setLoader(false)}, 10000);
        }
    return (
        <>
            <div className={loader ? styles.loader : styles.hideLoad} >
                <Spin size="large" />
            </div>
        
        <div className={styles.menu}>
            <div className={styles.menu__blok}>
                <img src={logo} alt="logo" />
                <Menu mode="horizontal" className={styles.menu}>
                    <Menu.Item key="search" >
                        Поиск
                    </Menu.Item>
                    <Menu.Item key="favorite">
                        Избранное
                    </Menu.Item>
                    <Menu.Item onClick={handleLogout} className={styles.logout} key="logout">
                        Выйти
                    </Menu.Item>
                </Menu>
            </div>
        </div>
            <Row
                type="flex"
                justify="center"
                align="middle"
                style={{ minHeight: '80vh' }}
                >
                    <div  className={styles.search__blok}>
                        <Title align="center" >Поиск Видео</Title>
                        <Input.Group compact className={styles.search__inp}>
                            <Input onChange={handleChange} placeholder="Что хотите посмотреть?" />
                            <Button onClick={getVideosId} type="primary">Найти</Button>
                        </Input.Group>
                        <div className={styles.result__blok}>
                            {videoList.map((item) => {
                                return (
                                    <div  key={item} className={styles.result__item} >
                                        <iframe key={item}  width="245" height="138" src={`https://www.youtube.com/embed/${item}`} title="YouTube video player" frameBorder="{0}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen> </iframe>
                                    </div>
                                )
                            })
                            }

                        </div>
                    </div>
            </Row>
        </>

    );
};

export default Home;