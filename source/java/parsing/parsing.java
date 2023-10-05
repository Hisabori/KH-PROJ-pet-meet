public class Main{
    public static void main(String[] args) throws ParseException {
        JSONAdd jsonAdd = new JSONAdd();
        //전체 파싱 정보가 저장된 jsonAdd의 json을 자체 String을 생성하여 옮겨 담음
        String json = jsonAdd.json;

        JSONParser parser = new JSONParser();

        JSONObject univ = (JSONObject)parser.parse(json);

        //테스트출력
        //System.out.println(univ.toJSONString());

        JSONArray arr = (JSONArray)univ.get("univ");

        //테스트출력
        //System.out.println(arr.toJSONString());

        for(int i=0;i<arr.size();i++){
            JSONObject tmp = (JSONObject)arr.get(i);//인덱스 번호로 접근해서 가져온다.

            String professor = (String)tmp.get("professor");
            String student = (String)tmp.get("student");

            System.out.println("----- "+i+"번째 인덱스 값 -----");
            System.out.println("교수 : "+professor);
            System.out.println("학생 : "+student);
        }
    }
}