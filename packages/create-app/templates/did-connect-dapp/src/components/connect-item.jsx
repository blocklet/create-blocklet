/* eslint-disable react/require-default-props */
import ConnectButton from '@arcblock/did-connect/lib/Button';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Box, Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function ConnectItem({ title, description = null, result = null, onClick = () => {} }) {
  const { t } = useLocaleContext();
  return (
    <Box>
      <Typography variant="h6" component="h5" color="textPrimary">
        {title}
      </Typography>
      {description ? (
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {description}
        </Typography>
      ) : null}
      <ConnectButton onClick={onClick} />
      {result ? (
        <Card sx={{ mt: 2 }} variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {t('result')}
            </Typography>
            {result}
          </CardContent>
        </Card>
      ) : null}
    </Box>
  );
}

ConnectItem.propTypes = {
  title: PropTypes.any.isRequired,
  description: PropTypes.any,
  result: PropTypes.any,
  onClick: PropTypes.func,
};
