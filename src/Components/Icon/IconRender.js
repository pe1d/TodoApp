import React from 'react';
import { useSelector } from 'react-redux';
import iconMap from './iconMap';

const IconRender = ({ selectedIcon }) => {
    const IconComponent = iconMap[selectedIcon];

    return IconComponent ? <IconComponent /> : null;
};

export default IconRender;
