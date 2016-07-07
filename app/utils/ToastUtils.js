import Toast from 'react-native-root-toast';

let toast;

export function toastShort(content) {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
}

export function toastLong(content) {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
}
