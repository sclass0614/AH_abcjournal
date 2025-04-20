// Supabase 클라이언트 설정
const SUPABASE_URL = "https://dfomeijvzayyszisqflo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmb21laWp2emF5eXN6aXNxZmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NjYwNDIsImV4cCI6MjA2MDQ0MjA0Mn0.-r1iL04wvPNdBeIvgxqXLF2rWqIUX5Ot-qGQRdYo_qk";

// 전역 Supabase 클라이언트 생성
let supabaseClient;

document.addEventListener('DOMContentLoaded', function() {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
  // 초기화 후 실행
  initialize();
});

/**
 * 모든 계획 데이터를 가져오는 함수
 * @return {Promise<Array>} 계획 데이터 배열
 */
async function getPlanAll() {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { data, error } = await supabaseClient
      .from('activities_plan')
      .select('*');
    
    if (error) {
      console.error('계획 데이터 로드 오류:', error);
      return [];
    }

    console.log("변환 전:", data); // 변환 전 데이터 확인

    // 날짜 형식 변환 (필요한 경우)
    const formattedData = data.map(row => {
      // 날짜 처리 (int4에서 문자열로 변환)
      const dateStr = row.날짜 ? row.날짜.toString() : '';
      
      return {
        ...row,
        날짜: dateStr
      };
    });

    console.log("변환 후:", formattedData); // 변환 후 데이터 확인
    return formattedData;
  } catch (error) {
    console.error('오류 발생:', error);
    return [];
  }
}

/**
 * 모든 활동 일지 데이터를 가져오는 함수
 * @return {Promise<Array>} 활동 일지 데이터 배열
 */
async function getJournalAll() {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { data, error } = await supabaseClient
      .from('activities_journal')
      .select('*');

    if (error) {
      console.error('일지 데이터 로드 오류:', error);
      return [];
    }

    console.log("변환 전:", data); // 변환 전 데이터 확인

    // 날짜 형식 변환 (필요한 경우)
    const formattedData = data.map(row => {
      // 날짜 처리 (int4에서 문자열로 변환)
      const dateStr = row.날짜 ? row.날짜.toString() : '';
      
      return {
        ...row,
        날짜: dateStr
      };
    });

    console.log("변환 후:", formattedData); // 변환 후 데이터 확인
    return formattedData;
  } catch (error) {
    console.error('오류 발생:', error);
    return [];
  }
}

/**
 * 모든 회원 정보를 가져오는 함수
 * @return {Promise<Array>} 회원 정보 데이터 배열
 */
async function getAllMembers() {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { data, error } = await supabaseClient
      .from('membersinfo')
      .select('회원번호, 회원명, 생년월일, 입소일, 퇴소일');

    if (error) {
      console.error('회원 데이터 로드 오류:', error);
      return [];
    }

    console.log("회원 데이터 변환 전:", data); // 변환 전 데이터 확인

    // 필요한 처리가 있다면 여기서 수행
    const formattedData = data.map(member => {
      return {
        ...member,
        생년월일: member.생년월일 ? member.생년월일.toString() : '',
        입소일: member.입소일 ? member.입소일.toString() : '',
        퇴소일: member.퇴소일 ? member.퇴소일.toString() : ''
      };
    });

    console.log("회원 데이터 변환 후:", formattedData); // 변환 후 데이터 확인
    return formattedData;
  } catch (error) {
    console.error('회원 데이터 로드 오류 발생:', error);
    return [];
  }
}

/**
 * 새로운 일지를 추가하는 함수
 * @param {Object} journalData - 추가할 일지 데이터 객체
 * @return {Promise<boolean>} 저장 성공 여부
 */
async function appendJournal(journalData) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    // UUID는 Supabase에서 자동 생성되므로 제외
    const { error } = await supabaseClient
      .from('activities_journal')
      .insert([journalData]);

    if (error) {
      console.error('일지 추가 오류:', error);
      return false;
    }

    return true; // 저장 성공
  } catch (error) {
    console.error('일지 추가 중 오류 발생:', error);
    return false;
  }
}

/**
 * 새로운 계획을 추가하는 함수
 * @param {Object} planData - 추가할 계획 데이터 객체
 * @return {Promise<boolean>} 저장 성공 여부
 */
async function appendPlan(planData) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    // UUID는 Supabase에서 자동 생성되므로 제외
    const { error } = await supabaseClient
      .from('activities_plan')
      .insert([planData]);

    if (error) {
      console.error('계획 추가 오류:', error);
      return false;
    }

    return true; // 저장 성공
  } catch (error) {
    console.error('계획 추가 중 오류 발생:', error);
    return false;
  }
}

/**
 * 기존 일지를 업데이트하는 함수
 * @param {string} journalId - 업데이트할 일지의 ID
 * @param {Object} journalData - 업데이트할 일지 데이터 객체
 * @return {Promise<boolean>} 업데이트 성공 여부
 */
async function updateJournal(journalId, journalData) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { error } = await supabaseClient
      .from('activities_journal')
      .update(journalData)
      .eq('일지_id', journalId);

    if (error) {
      console.error('일지 업데이트 오류:', error);
      return false;
    }

    return true; // 업데이트 성공
  } catch (error) {
    console.error('일지 업데이트 중 오류 발생:', error);
    return false;
  }
}

/**
 * 일지를 삭제하는 함수
 * @param {string} journalId - 삭제할 일지의 ID
 * @return {Promise<boolean>} 삭제 성공 여부
 */
async function deleteJournalRow(journalId) {
  try {
    if (!supabaseClient) {
      supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    const { error } = await supabaseClient
      .from('activities_journal')
      .delete()
      .eq('일지_id', journalId);

    if (error) {
      console.error('일지 삭제 오류:', error);
      return false;
    }

    return true; // 삭제 성공
  } catch (error) {
    console.error('일지 삭제 중 오류 발생:', error);
    return false;
  }
}

// 시간 문자열을 숫자로 변환하는 유틸리티 함수
function timeToNumber(timeString) {
  if (!timeString) return 0;
  
  // "HH:MM" 형식 문자열을 숫자로 변환
  const parts = timeString.split(':');
  if (parts.length !== 2) return 0;
  
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

// 숫자를 시간 문자열로 변환하는 유틸리티 함수
function numberToTime(number) {
  const hours = Math.floor(number / 60);
  const minutes = number % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
} 