import PropTypes from 'prop-types';
import clsx from 'clsx';

function ListInfo({ className, list }) {
  return (
    <div className={clsx('p-10 bg-[#f8f8f8]', className)} lg="p-20">
      <div className="max-w-[1440px] grid grid-cols-1" lg="grid-cols-3">
        {list.map((item) => (
          <div className="p-3" lg="p-5" key={`${item.title}__${item.description}`}>
            <h3 className="text-2xl">{item.title}</h3>
            <p className="text-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ListInfo.propTypes = {
  className: PropTypes.string,
  list: PropTypes.array,
};

ListInfo.defaultProps = {
  className: '',
  list: [],
};

export default ListInfo;
