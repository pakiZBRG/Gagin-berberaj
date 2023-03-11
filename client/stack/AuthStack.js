import { Login, Register, ForgotPassword, ResetPassword, AccountCreated, EmailSent } from '../screens';

const options = { headerShown: false }

const AuthStack = ({ Stack }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={options} />
      <Stack.Screen name='Register' component={Register} options={options} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={options} />
      <Stack.Screen name='ResetPassword' component={ResetPassword} options={options} />
      <Stack.Screen name='AccountCreated' component={AccountCreated} options={options} />
      <Stack.Screen name='EmailSent' component={EmailSent} options={options} />
    </Stack.Navigator>
  );
};

export default AuthStack