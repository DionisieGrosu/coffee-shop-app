import React, {Component, ComponentElement} from 'react';

import AwesomeAlert from 'react-native-awesome-alerts';

type AlertPropsType = {
  show: boolean;
  title?: string;
  message?: string;
  closeOnTouchOutside?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  cancelHandler?: () => void;
  confirmHamdler?: () => void;
  component?: ComponentElement<any, any> | null;
};

function Alert({
  show,
  title = '',
  message = '',
  closeOnTouchOutside = false,
  showCancelButton = false,
  showConfirmButton = true,
  cancelText = '',
  confirmText = '',
  cancelHandler = () => {},
  confirmHamdler = () => {},
  component = null,
}: AlertPropsType) {
  return (
    <AwesomeAlert
      messageStyle={{textAlign: 'center'}}
      titleStyle={{textAlign: 'center'}}
      show={show}
      showProgress={false}
      title={!component ? title : ''}
      message={!component ? message : ''}
      closeOnTouchOutside={closeOnTouchOutside}
      closeOnHardwareBackPress={false}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      cancelText={cancelText}
      confirmText={confirmText}
      confirmButtonColor="#C67C4E"
      onCancelPressed={cancelHandler}
      onConfirmPressed={confirmHamdler}
      customView={component ? component : null}
      onDismiss={cancelHandler}
    />
  );
}

export default Alert;
