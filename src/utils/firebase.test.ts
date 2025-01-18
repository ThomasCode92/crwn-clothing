import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signOutUser,
} from "./firebase";

const existsFn = vi.fn().mockReturnValue(false);
const { setDocSpy } = vi.hoisted(function () {
  return { setDocSpy: vi.fn() };
});

vi.mock("firebase/auth");
vi.mock("firebase/firestore", async function () {
  const firestore = await vi.importActual("firebase/firestore");
  return {
    ...firestore,
    doc: () => ({ id: "123" }),
    getDoc: () => ({ exists: existsFn }),
    setDoc: setDocSpy,
  };
});

const mockUserAuth = {
  uid: "123",
  displayName: "Test User",
  email: "test@example.com",
} as User;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("signInWithGooglePopup", function () {
  it("should sign in with Google using popup", async () => {
    await signInWithGooglePopup();
    expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(Object));
  });
});

describe("signInWithGoogleRedirect", function () {
  it("should sign in with Google using redirect", async () => {
    await signInWithGoogleRedirect();
    expect(signInWithRedirect).toHaveBeenCalledWith(auth, expect.any(Object));
  });
});

describe("onAuthStateChangedListener", function () {
  it("should call onAuthStateChanged with the provided callback", async () => {
    const callback = vi.fn();
    onAuthStateChangedListener(callback);
    expect(onAuthStateChanged).toHaveBeenCalledWith(auth, callback);
  });
});

describe("createUserDocumentFromAuth", function () {
  it("should create a user document from auth if user doesn't exist", async () => {
    const userDocRef = await createUserDocumentFromAuth(mockUserAuth);
    expect(setDocSpy).toHaveBeenCalledWith(userDocRef, expect.any(Object));
    expect(userDocRef.id).toBe("123");
  });

  it("should just return the user document reference if user exists", async () => {
    existsFn.mockReturnValueOnce(true);
    const userDocRef = await createUserDocumentFromAuth(mockUserAuth);
    expect(setDocSpy).not.toHaveBeenCalled();
    expect(userDocRef.id).toBe("123");
  });

  it("should log an error if creating a user fails", async function () {
    const consoleSpy = vi.spyOn(console, "error");
    setDocSpy.mockRejectedValue(new Error("Failed to create user document"));
    await createUserDocumentFromAuth(mockUserAuth);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error creating user document",
      expect.any(Error),
    );
  });
});

describe("createAuthUserWithEmailAndPassword", function () {
  it("should create an auth user with email and password successfully", async function () {
    await createAuthUserWithEmailAndPassword("john.doe@crwn.com", "password");
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "john.doe@crwn.com",
      "password",
    );
  });
});

describe("signInAuthUserWithEmailAndPassword", function () {
  it("should sign in an auth user with email and password successfully", async function () {
    await signInAuthUserWithEmailAndPassword("john.doe@crwn.com", "password");
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      "john.doe@crwn.com",
      "password",
    );
  });
});

describe("signOutUser", function () {
  it("should sign out the current user", async function () {
    await signOutUser();
    expect(signOut).toHaveBeenCalled();
  });
});
