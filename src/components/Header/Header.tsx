import { Container, Header as MantineHeader } from '@mantine/core';

import { HeaderHeight } from 'common/constants';
import { ColorSchemeToggle, Logo } from 'components';

import useStyles from './Header.styles';

const Header = () => {
    const { classes } = useStyles();

    return (
        <MantineHeader height={HeaderHeight} className={classes.root}>
            <Container className={classes.header}>
                <Logo />

                <ColorSchemeToggle />
            </Container>
        </MantineHeader>
    );
};

export default Header;
