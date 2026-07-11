const fs = require('fs');
let code = fs.readFileSync('pages/BlogAdmin.tsx', 'utf8');

// Find the parts
const isEditingIndex = code.indexOf(') : !isEditing ? (');
const activeTabMessagesIndex = code.indexOf(") : activeTab === 'messages' ? (");
const elseIndex = code.indexOf(') : (', activeTabMessagesIndex);

// We know the structure:
// ...
//        ) : !isEditing ? (
//          [POSTS_LIST]
//        ) : activeTab === 'messages' ? (
//          [MESSAGES_LIST]
//        ) : (
//          [EDIT_FORM]
//        )}

// We want:
//        ) : isEditing ? (
//          [EDIT_FORM]
//        ) : activeTab === 'messages' ? (
//          [MESSAGES_LIST]
//        ) : (
//          [POSTS_LIST]
//        )}

const prefix = code.substring(0, isEditingIndex);
const postsList = code.substring(isEditingIndex + 18, activeTabMessagesIndex);
const messagesList = code.substring(activeTabMessagesIndex + 32, elseIndex);
// find where the Edit form ends. It ends at the last "        )}" before "</main>"
const mainEndIndex = code.indexOf('</main>');
const editFormEndIndex = code.lastIndexOf(')}', mainEndIndex);
const editForm = code.substring(elseIndex + 5, editFormEndIndex);
const suffix = code.substring(editFormEndIndex + 2);

const newCode = prefix + 
  ') : isEditing ? (' + 
  editForm + 
  ") : activeTab === 'messages' ? (" + 
  messagesList + 
  ') : (' + 
  postsList + 
  ')}' + 
  suffix;

fs.writeFileSync('pages/BlogAdmin.tsx', newCode);
console.log('Fixed BlogAdmin.tsx');
