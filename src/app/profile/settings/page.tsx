import ChangePasswordForm from '@/components/profile/settings/ChangePasswordForm';
import {
  Settings,
  SettingsBlock,
  SettingsBlockContent,
  SettingsBlockTitle,
  SettingsList,
} from './Settings.styled';
import ChangeLoginForm from '@/components/profile/settings/ChangeLoginForm';

const SettingsPage = () => {
  return (
    <Settings>
      <h2>SETTINGS</h2>
      <SettingsList>
        <SettingsBlock>
          <SettingsBlockTitle>Account</SettingsBlockTitle>
          <SettingsBlockContent>
            <ChangePasswordForm />
            <ChangeLoginForm />
          </SettingsBlockContent>
        </SettingsBlock>
      </SettingsList>
    </Settings>
  );
};

export default SettingsPage;
