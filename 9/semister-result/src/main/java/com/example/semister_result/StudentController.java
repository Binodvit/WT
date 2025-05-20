package com.example.semister_result;

import com.example.semister_result.Student;
import com.example.semister_result.MSE;
import com.example.semister_result.ESE;
import com.example.semister_result.StudentRepository;
import com.example.semister_result.MSERepository;
import com.example.semister_result.ESERepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private MSERepository mseRepository;
    @Autowired
    private ESERepository eseRepository;

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/marks/{prn}")
    public Map<String, Object> getMarks(@PathVariable String prn) {
        MSE mse = mseRepository.findById(prn).orElse(null);
        ESE ese = eseRepository.findById(prn).orElse(null);
        return Map.of("mse", mse, "ese", ese);
    }

    @PostMapping("/students")
    public Student addStudent(@RequestBody Map<String, Object> payload) {
        Student student = new Student();
        student.setPrn((String) payload.get("prn"));
        student.setName((String) payload.get("name"));
        student.setBranch((String) payload.get("branch"));
        studentRepository.save(student);

        MSE mse = new MSE();
        mse.setPrn(student.getPrn());
        Map<String, Double> mseMarks = (Map<String, Double>) payload.get("mse");
        mse.setSubject1(mseMarks.get("subject1").floatValue());
        mse.setSubject2(mseMarks.get("subject2").floatValue());
        mse.setSubject3(mseMarks.get("subject3").floatValue());
        mse.setSubject4(mseMarks.get("subject4").floatValue());
        mseRepository.save(mse);

        ESE ese = new ESE();
        ese.setPrn(student.getPrn());
        Map<String, Double> eseMarks = (Map<String, Double>) payload.get("ese");
        ese.setSubject1(eseMarks.get("subject1").floatValue());
        ese.setSubject2(eseMarks.get("subject2").floatValue());
        ese.setSubject3(eseMarks.get("subject3").floatValue());
        ese.setSubject4(eseMarks.get("subject4").floatValue());
        eseRepository.save(ese);

        return student;
    }
}