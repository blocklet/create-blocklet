import path from 'path-browserify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInjectContext } from 'virtual:context';

function Redirect({ url }) {
  const injectData = useInjectContext();
  const navigate = useNavigate();

  const { routes, basename } = injectData;
  const route = routes.find((route) => route.name === url);
  useEffect(() => {
    if (route) {
      navigate(url, {
        replace: true,
      });
    } else {
      window.location.replace(path.join(basename, url));
    }
  }, []);
  return <div>Redirecting</div>;
}

export default Redirect;
