// Form initializer templates
import { MailIcon, UserFilledIcon } from "../components/SVG/Icons" // test icons with auth forms

export default function FormInitializers() {
  // Photo entry
  // create 
   const createPhoto = {
    title: {
      type: 'text',
      value: '',
      placeholder: 'photo title',
      label: 'Title',
      minLength: 5,
      maxLength: 50,
      required: true,
    },
    author: {
      type: 'text',
      value: '',
      placeholder: 'photographer\'s name',
      label: 'Author',
      minLength: 4,
      maxLength: 50,
      required: true,
    },
    gpsLatitude: {
      type: 'number',
      value: '',
      placeholder: 'a value between -90 and 90',
      label: 'GPS latitude°',
      required: false,
      min: -90,
      max: 90
    },
    gpsLongitude: {
      type: 'number',
      value: '',
      placeholder: 'a value between -180 and 180',
      label: 'GPS longitude°',
      required: false,
      min: -180,
      max: 180
    },
    captureDate: {
      type: 'date',
      value: '',
      label: 'Capture date',
      required: false
    },
    description: {
      type: 'textarea',
      value: '',
      placeholder: 'a brief description about the photo...',
      label: 'Description',
      maxLength: 500,
      required: false,
    },
    photoFile: {
      type: 'file',
      value: {},
      required: true,
    }
  }

  // update 
   const updatePhoto = {
    _id : {
      type: 'text',
      value: '',
      placeholder: 'photo title',
      disabled: true,
      label: 'ID',
      required: true
    },
    photoName: {
      type: 'text',
      value: '',
      disabled: true,
      label: 'File name',
      required: true
    },
    title: {
      type: 'text',
      value: '',
      placeholder: 'photo title',
      label: 'Title',
      required: true,
      minLength: 5,
      maxLength: 50
    },
    author: {
      type: 'text',
      value: '',
      placeholder: 'photographer\'s name',
      label: 'Author',
      required: true,
      minLength: 4,
      maxLength: 50
    },
    gpsLatitude: {
      type: 'number',
      value: '',
      placeholder: 'a value between -90 and 90',
      label: 'GPS latitude°',
      required: false,
    },
    gpsLongitude: {
      type: 'number',
      value: '',
      placeholder: 'a value between -180 and 180',
      label: 'GPS longitude°',
      required: false,
    },
    captureDate: {
      type: 'date',
      value: '',
      label: 'Capture date',
      required: false
    },
    description: {
      type: 'textarea',
      value: '',
      placeholder: 'a brief description about the photo...',
      label: 'Description',
      maxLength: 500,
      required: false,
    },
    photoFile: {
      type: 'file',
      value: {},
      required: false,
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