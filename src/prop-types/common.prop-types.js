import PropTypes from 'prop-types';

export const IdPropTypes = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const MenuPropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string
})