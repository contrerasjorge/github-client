import React, {
  useEffect,
  PropsWithChildren,
  FC,
  ReactNode,
  useRef,
} from 'react';

export type FormValues = {
  textbox: string[];
};

type FormProps = {
  onSubmit(values: FormValues): void;
  children(triggerSubmit: () => void): ReactNode;
};

export const Form: FC<FormProps> = ({ children, onSubmit }) => {
  const form = useRef<any>();

  const triggerSubmit = () => {
    form.current.submit();
  };

  useEffect(() => {
    setTimeout(() => {
      form.current.focus();
    }, 0);
  }, []);

  return (
    <blessed-form
      top={3}
      keys
      focused
      ref={form}
      style={{
        bg: 'white',
      }}
      onSubmit={onSubmit}
    >
      {children(triggerSubmit)}
    </blessed-form>
  );
};
