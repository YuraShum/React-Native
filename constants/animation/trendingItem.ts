import * as Animatable from 'react-native-animatable';

const zoomIn: Animatable.CustomAnimation = {
    from: {
        transform: [{ scale: 0.9 }],
    },
    to: {
        transform: [{ scale: 1 }],
    },
};

const zoomOut: Animatable.CustomAnimation = {
    from: {
        transform: [{ scale: 1 }],
    },
    to: {
        transform: [{ scale: 0.9 }],
    },
};

export default { zoomIn, zoomOut }

