import { StylesConfig } from 'react-select';

interface OptionType {
    value: string;
    label: string;
}

const breakpoints = {
    tablet: `@media only screen and (min-width: 768px)`,
};

export const selectedStyles = (): StylesConfig<OptionType, boolean> => ({
    control: styles => ({
        ...styles,

        width: '120px',
        // height: 'max-content',
        padding: '12px 14px',
        fontSize: '12px',
        fontWeight: '500',
        lineHeigh: '16px',
        latterSpacing: '-0.24px',

        backgroundColor: 'transparent',
        borderRadius: '12px',
        border: '1px solid #3e3e3e',
        cursor: 'pointer',

        boxShadow: 'none',

        '&:hover': {
            border: '1px solid #3e3e3e',
        },
        [breakpoints.tablet]: {
            width: '153px',
            padding: '14px',
            fontSize: '14px',
            fontWeight: '500',
            lineHeigh: '18px',
            latterSpacing: '-0.28px',
        },
    }),

    valueContainer: styles => ({
        ...styles,
        padding: '0',
        margin: '0',
    }),

    singleValue: styles => ({ ...styles, margin: '0', color: '#f9f9f9' }),

    indicatorSeparator: styles => ({ ...styles, display: 'none' }),

    dropdownIndicator: (styles, state) => ({
        ...styles,
        padding: '0',
        color: '#f9f9f9',
        transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
    }),

    input: styles => ({
        ...styles,
        padding: '0',
        margin: '0',
    }),

    menu: styles => ({
        ...styles,
        top: '100%',
        width: '100%',
        height: 'max-content',

        borderRadius: '12px',
        background: '#262626',

        fontSize: '12px',
        fontWeight: '500',
        lineHeigh: '16px',
        latterSpacing: '-0.24px',
        overflow: 'auto',

        [breakpoints.tablet]: {
            width: '153px',
            fontSize: '14px',
            fontWeight: '500',
            lineHeigh: '18px',
            latterSpacing: '-0.28px',
        },
    }),

    menuList: styles => ({
        ...styles,
        width: '100%',
        maxHeight: 'none',
        padding: '12px ',
    }),

    placeholder: styles => ({
        ...styles,
        color: '#f9f9f9',

        width: '100%',
        height: 'max-content',
    }),
    option: styles => ({
        ...styles,
        cursor: 'pointer',

        backgroundColor: '#262626',

        '&:hover': {
            color: '#f9f9f9',
        },
    }),
});
