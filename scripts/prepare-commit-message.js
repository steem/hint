const shell = require('shelljs');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

shell.config.silent = true;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const GIT_COMMIT_MESSAGE_FILE = '.git/COMMIT_EDITMSG';

const NEW_GIT_COMMIT_MESSAGE = `
# [!] The commit message should have the following form:
#
# ---
# <Tag>: Capitalized, summary (less then 50 chars)
# <blank line>
# If necessary, more detailed explanatory text, wrapped to about 72
# characters or so.
#
# The commit message should be in the imperative: "Fix bug" and not
# "Fixed bug" or "Fixes bug."  This convention matches up with commit
# messages generated by commands like \`git merge\` and \`git revert\`.
#
# If applicable, at the end, write where the users can find more
# information (URL(s), or other related issues), and/or what this
# commit fixes.
#
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
#
# Ref <URL/issue/issue comment>
#
# Fix #<issue>
# Close #<issue>
# ---
#
# For more information related to commit messages, please see:
# https://sonarwhal.com/docs/contributor-guide/contributing/pull-requests/#commitmessages
#`;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

try {

    const DEFAULT_GIT_COMMIT_MESSAGE = shell.cat(GIT_COMMIT_MESSAGE_FILE);

    /*
     * Only add the additional information to the commit message
     * if it's a new commit (there isn't yet a commit message),
     * so it's not a case such as an amend.
     */

    if (/^\s+# Please enter the commit message for your changes.*/gi.test(DEFAULT_GIT_COMMIT_MESSAGE)) {
        shell.ShellString(`${NEW_GIT_COMMIT_MESSAGE} ${DEFAULT_GIT_COMMIT_MESSAGE}`).to(GIT_COMMIT_MESSAGE_FILE);
    }

} catch (e) {
    /*
     * If something fails, just ignore it, users will
     * just get the default commit message, not a big deal.
     */
}
