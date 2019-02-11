import React from 'react'
import ReactDOM from 'react-dom'

const destroyChild = (div) => {
    setTimeout(() => {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }, 1000);
}

export const call = (Component, props = {}) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(React.createElement(Component, { ...props, destroy: () => destroyChild(div) }), div);
}