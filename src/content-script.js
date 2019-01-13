const ADIT_GROUP_ID = 'refined_jobcan_adit_group_id'
const IS_YAKIN = 'refined_jobcan_is_yakin'
const IS_YAKIN_CHECKED_AT = 'refined_jobcan_is_yakin_checked_at'

document.addEventListener('DOMContentLoaded', () => {
  const inputAditGroupId = document.getElementById('adit_group_id')
  const checkIsYakin = document.getElementById('is_yakin')

  // save on change
  inputAditGroupId.addEventListener('change', e => {
    localStorage.setItem(ADIT_GROUP_ID, e.target.value, 10)
  })

  checkIsYakin.addEventListener('change', e => {
    localStorage.setItem(IS_YAKIN, e.target.checked)
    localStorage.setItem(IS_YAKIN_CHECKED_AT, +new Date())
  })

  // restore on load
  const restoredAditGroupId = localStorage.getItem(ADIT_GROUP_ID)
  if (restoredAditGroupId) {
    inputAditGroupId.value = restoredAditGroupId
  }

  const restoredIsYakin = localStorage.getItem(IS_YAKIN) === 'true'
  const whenIsYakinChecked = localStorage.getItem(IS_YAKIN_CHECKED_AT)
  // CASE:
  // - 夜勤が前回アクセス時にチェックされていて、
  // - 現在の値が夜勤ではなく、
  // - 夜が空けていない時にチェックを戻す
  //   NOTE: 夜勤モードをクリックした時から6:00をリミットにする
  if (
    restoredIsYakin &&
    !checkIsYakin.checked &&
    whenIsYakinChecked + 3600 * 6 * 1000 > +new Date()
  ) {
    checkIsYakin.click()
  }
})
