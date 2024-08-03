import { LoaderIcon } from 'src/components/atoms/LoaderIcon';

const Loader = () => {
  const classNames = {
    conatiner: 'w-full h-full absolute flex justify-center items-center',
    label: 'sr-only'
  };

  return (
    <div className={classNames.conatiner}>
      <div role="status">
        <LoaderIcon />
        <span className={classNames.label}>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
