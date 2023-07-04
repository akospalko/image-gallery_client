// Form initializer templates
import { MailIcon, UserFilledIcon } from "../components/SVG/Icons" // test icons with auth forms

export default function FormInitializers() {
  // Photo entry
  // create 
   const createPhoto = {
    title: {
      type: 'text',
      value: '',
      label: 'Title',
      required: true,
      minLength: 5,
      maxLength: 50
    },
    author: {
      type: 'text',
      value: '',
      label: 'Author',
      required: true,
      minLength: 4,
      maxLength: 50
    },
    gpsLatitude: {
      type: 'number',
      value: '',
      label: 'GPS latitude'
    },
    gpsLongitude: {
      type: 'number',
      value: '',
      label: 'GPS longitude'
    },
    captureDate: {
      type: 'date',
      value: '',
      label: 'Capture date'
    },
    description: {
      type: 'textarea',
      value: '',
      label: 'Description',
      maxLength: 500
    },
    photoFile: {
      type: 'file',
      value: {},
    }
  }

  // update 
   const updatePhoto = {
    _id : {
      type: 'text',
      value: '',
      disabled: true,
      label: 'ID'
    },
    photoName: {
      type: 'text',
      value: '',
      disabled: true,
      label: 'File name'
    },
    title: {
      type: 'text',
      value: '',
      label: 'Title',
      required: true,
      minLength: 5,
      maxLength: 50
    },
    author: {
      type: 'text',
      value: '',
      label: 'Author',
      required: true,
      minLength: 4,
      maxLength: 50
    },
    gpsLatitude: {
      type: 'number',
      value: '',
      label: 'GPS latitude'
    },
    gpsLongitude: {
      type: 'number',
      value: '',
      label: 'GPS longitude'
    },
    captureDate: {
      type: 'date',
      value: '',
      label: 'Capture date'
    },
    description: {
      type: 'textarea',
      value: '',
      label: 'Description',
      maxLength: 500
    },
    photoFile: {
      type: 'file',
      value: {},
    }
  }

  // Authentication
  // login
   const login = {
    username: {
      type: 'text',
      placeholder: 'USERNAME',
      value: '',
      label: 'Username',
      required: true,
      fieldName: 'usernameLogin',
      icon: <UserFilledIcon height='var(--input-icon-dimension)' width='var(--input-icon-dimension)' fill='var(--text-color--medium-emphasis)'/>
    },
    password: {
      type: 'password',
      placeholder: 'PASSWORD',
      value: '',
      label: 'Password',
      required: true,
      minLength: 8,
      fieldName: 'passwordLogin',
    }
  }

  // register
   const register = {
    username: {
      type: 'text',
      placeholder: 'USERNAME',
      value: '',
      label: 'Username',
      required: true,
      minLength: 4,
      fieldName: 'usernameRegister',
      icon: <UserFilledIcon height='var(--input-icon-dimension)' width='var(--input-icon-dimension)' fill='var(--text-color--medium-emphasis)' />
    },
    email: {
      type: 'email',
      placeholder: 'EMAIL',
      value: '',
      label: 'E-mail',
      required: true,
      icon: <MailIcon height='var(--input-icon-dimension)' width='var(--input-icon-dimension)' fill='var(--text-color--medium-emphasis)' />
    },
    password: {
      type: 'password',
      placeholder: 'PASSWORD',
      value: '',
      label: 'Password',
      required: true,
      minLength: 8,
      fieldName: 'passwordRegister',
    },
    passwordConfirm: {
      type: 'password',
      placeholder: 'PASSWORD CONFIRM',
      value: '',
      label: 'Password confirm',
      required: true,
      minLength: 8,
      fieldName: 'passwordConfirmRegister',
    }
  }

  // form to get email where the password reset link is to be sent
   const passwordResetSendEmailLink = {
    email: {
      type: 'email',
      placeholder: 'EMAIL',
      value: '',
      label: 'E-mail',
      required: true,
      icon: <MailIcon height='var(--input-icon-dimension)' width='var(--input-icon-dimension)' fill='var(--text-color--medium-emphasis)'/>
    }
  }

  // form to get new password which are to be saved as the new password for the account
   const passwordResetSaveNewPassword = {
    email: {
      type: 'email',
      placeholder: 'EMAIL',
      value: '',
      label: 'E-mail',
      required: true,
      icon: <MailIcon height='var(--input-icon-dimension)' width='var(--input-icon-dimension)' fill='var(--text-color--medium-emphasis)'/>
    },
    password: {
      type: 'password',
      placeholder: 'PASSWORD',
      value: '',
      label: 'PASSWORD',
      required: true,
      minLength: 8,
      fieldName: 'passwordReset'
    },
    passwordConfirm: {
      type: 'password',
      placeholder: 'PASSWORD CONFIRM',
      value: '',
      label: 'Password',
      required: true,
      minLength: 8,
      fieldName: 'passwordConfirmReset'
    }
  }

  return { 
    createPhoto, 
    updatePhoto, 
    login, 
    register,
    passwordResetSendEmailLink,
    passwordResetSaveNewPassword,
  }
}