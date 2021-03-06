import React from 'react'
import styles from './styles/ChooseService.module.css'
import { Link } from 'react-router-dom'
import AppBar from "../AppBar/AppBar";
import ConfigArea from '../ConfigArea/ConfigArea';
import Request from '../Request';
import { useCookies } from 'react-cookie';
import Service from './Service';
import { goToPage } from '../Utils';

function SubDescription({ title, list }) {
    return (
        <div className={styles.subDescription}>
            {list.length === 0 ? null : 
                <div className={styles.littleTitle}>
                    {title}
                </div>
            }
            
            <div>
            {list?.map((elem, index) => {
                return (
                    <div key={index} className={styles.littleElem}>
                        <div className={styles.littleElemTitle}>{elem.name}</div>
                        <div className={styles.littleElemDescription}>{elem.description}</div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

function DescriptionWidget({ hidden, onLeft, name, actions, reactions }) {
    return (
        <div className={`${styles.descriptionService} ${hidden ? styles.hidden : null} ${onLeft ? styles.descriptionLeft : styles.descriptionRight}`}>
            <div className={styles.serviceTitle}>{name}</div>
            <SubDescription title="Actions" list={actions}></SubDescription>
            <SubDescription title="Reactions" list={reactions}></SubDescription>
        </div>
    )
}

function ServiceWidget({setActiveService, service, onLeft }) {
    const [hover, setHover] = React.useState(false)

    return (
        <div>
            <DescriptionWidget hidden={!hover} onLeft={onLeft} name={service?.name} actions={service?.actions} reactions={service?.reactions}></DescriptionWidget>
            <img onClick={() => {setActiveService(service)}} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} className={`${styles.serviceLogo} ${hover ? styles.logoGoCenter : null}`} src={service?.logo} alt={service?.logo}></img>  
        </div>
    )
}

function ListServices() {
    const [listServices, setListServices] = React.useState([])
    const [cookies,,removeCookies] = useCookies('closeGetStarted')
    const [activeService, setActiveService] = React.useState()
    const [action, setAction] = React.useState()
    const [reaction, setReaction] = React.useState()

    React.useEffect(() => {
        console.log(action)
        Request.getServices().then((res) => {
            setListServices(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [action, reaction])

    function enableIt() {
        removeCookies('closeGetStarted')
    }

    return (
        <div className="background">
            <AppBar></AppBar>
            <div className={styles.servicesPage}>
            <ConfigArea activeService={activeService} setActiveService={setActiveService} action={action} reaction={reaction} setAction={setAction} setReaction={setReaction}></ConfigArea>
            {activeService === undefined ?
                <div className={styles.servicePageBody}>
                    <div className={styles.titlePage}>Services</div>
                    {cookies?.logged ?
                        <div className={styles.listServices}>
                            {listServices?.map((elem, index) => {
                                return (
                                    <ServiceWidget key={elem?.id} setActiveService={setActiveService} service={elem} onLeft={index % 2 === 0 ? true : false}></ServiceWidget>
                                )
                            })}
                        </div>
                        : <a onClick={() => {enableIt()}} className={styles.listServices} href='https://picsum.photos/1080/720' target='_blank'>
                            <button className={styles.button}>Read the get started !</button>
                        </a>
                    }
                </div>
                : <Service setActiveService={setActiveService} service={activeService} setAction={setAction} setReaction={setReaction}></Service>
            }
            </div>
        </div>
    )
}

export default ListServices