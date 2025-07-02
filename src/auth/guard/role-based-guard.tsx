import { m } from 'framer-motion';
// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// hooks
// import { useSelector } from 'src/redux/store';
// assets
import { ForbiddenIllustration } from 'src/assets/illustrations';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  children: React.ReactNode;
  roles: string[];
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({ hasContent, roles, children, sx }: RoleBasedGuardProp) {
  // Logic here to get current user role
  const { user } = useAuthContext();

  // TODO: get all roles from redux
  // useSelector((state) => state.user.roles);

  // const currentRole = 'user';
  const currentRoles = user?.roles.map((role) => role.name);

  if (typeof roles !== 'undefined' && !roles.some((role) => currentRoles?.includes(role))) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            دسترسی ممنوع
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            شما اجازه دسترسی به این صفحه را ندارید
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
