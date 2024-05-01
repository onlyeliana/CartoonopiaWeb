import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
    height: '380px',
    color: '#fff',
    lineHeight: '30px',
    textAlign: 'center',
    background: '#364d79',
    overflow: 'hidden'
};
const box: React.CSSProperties = {
    overflow: 'hidden'
}
const banimg: React.CSSProperties = {
    width: '100%',
    verticalAlign: 'middle',
    transform: 'translateY(-10%)'
}
const HeroBanner: React.FC = () => (
    <Carousel autoplay style={contentStyle}>
        <div style={box}>
            <Link to={`/hero/ahri`}>
                <img style={banimg} src={`${require('../../../assets/Ahri_0.jpg')}`} alt='' /></Link>
        </div>
        <div style={box}>
            <Link to={`/hero/lillia`}>
                <img style={banimg} src={`${require('../../../assets/Lillia_19.jpg')}`} alt='' /></Link>
        </div>
        <div style={box}>
            <Link to={`/hero/darius`}>
                <img style={banimg} src={`${require('../../../assets/Darius_0.jpg')}`} alt='' />
            </Link>
        </div>
        <div style={box}>
            <Link to={`/hero/ekko`}>
                <img style={banimg} src={`${require('../../../assets/Ekko_0.jpg')}`} alt='' />
            </Link>
        </div>
        <div style={box}>
            <img style={banimg} src={`${require('../../../assets/Lux_0.jpg')}`} alt='' />
        </div>
    </Carousel >
);

export default HeroBanner;