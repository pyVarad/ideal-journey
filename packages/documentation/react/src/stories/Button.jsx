import React from 'react';
import PropTypes from 'prop-types';
import './button.css';
import { PfxButton } from '@pfx/react'

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  return (
    <PfxButton>Test Button</PfxButton>
  )
};


Button.defaultProps = {
};
