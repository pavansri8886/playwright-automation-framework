export const loginLocators = {

    headerOfPage: { locator: 'img[src*="LogoCCWhite"]' }, // css because there is no role or text associated with this element
    logInButton: { role: 'button' as const, name: 'Log in' },
    emailField: { role: 'textbox' as const, name: 'Email address' },
    passwordField: { role: 'textbox' as const, name: 'Password' },
    signInButton: { role: 'button' as const, name: 'SIGN IN' },
    dashboardWelcomeMessage: { locator: 'div[class*="page-header"]>p' }, //css because there is no role or text associated with this element
};