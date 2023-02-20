

// course id must be a string in the form of [characters][digits]
// e.g. es11, math166
export default function parse_course_id(course_id: string) {
  // TODO: get request for course name parameter of associated course
  
  if (course_id) {
    var course_id_len = course_id.length
    var parsedString = ""
    var isNum = false
    if (course_id_len == 0) {
      throw new Error("INVALID COURSE ID")
    }
    for (let i = 0; i < course_id_len; i++) {
      if ((/[a-zA-Z]/).test(course_id[i])) {
        if (isNum == true) {
          throw new Error("INVALID COURSE ID"); 
        }
        parsedString = parsedString.concat(course_id[i].toUpperCase())
      }
      else if (/^\d$/.test(course_id[i]))  {
        if (i == 0) {
          throw new Error("INVALID COURSE ID")
        }
        if (isNum == false) {
          parsedString = parsedString.concat(" ")
        }
        isNum = true
        parsedString = parsedString.concat(course_id[i])
      }
      else {
        throw new Error("INVALID COURSE ID")
      }
    }
  
    return parsedString
  }
  else {return ("")}
}